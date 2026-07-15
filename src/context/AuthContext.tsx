"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getFirebaseAuth, getFirebaseDb } from "@/services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type UserRole = "organizer" | "staff" | "fan" | "guest" | "volunteer";

export interface UserData {
  uid: string;
  name: string;
  email: string | null;
  photo?: string | null;
  role: UserRole;
  joinedDate: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  organization?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
  logout: () => Promise<void>;
  userData: UserData | null;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>("guest");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const db = getFirebaseDb();

    // If Firebase failed to initialize (e.g., during build or missing API keys), skip setup
    if (!auth || !db) {
      setLoading(false);
      return;
    }

    // Set persistence to local (keeps user logged in across refreshes)
    setPersistence(auth!, browserLocalPersistence).catch(err => {
      console.warn("Firebase persistence error:", err);
    });

    const unsubscribe = onAuthStateChanged(auth!, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Fetch extended user data from Firestore
        try {
          const userDocRef = doc(db!, "users", firebaseUser.uid);

          // Add a small delay or retry to handle Firestore auth state sync issues
          let userDoc;
          try {
            userDoc = await getDoc(userDocRef);
          } catch (e: any) {
            if (e.code === 'permission-denied') {
              // Wait 500ms and retry once
              await new Promise(resolve => setTimeout(resolve, 500));
              userDoc = await getDoc(userDocRef);
            } else {
              throw e;
            }
          }

          if (userDoc && userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setUserData(data);
            setRole(data.role || "fan");
          } else if (firebaseUser.uid) {
            // Document doesn't exist, create it
            const defaultData: UserData = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || "New User",
              email: firebaseUser.email,
              photo: firebaseUser.photoURL,
              role: "fan",
              joinedDate: new Date().toISOString(),
              phone: "",
              address: "",
              city: "",
              country: "",
              organization: "",
              bio: ""
            };
            try {
              await setDoc(userDocRef, defaultData);
              const freshDoc = await getDoc(userDocRef);
              if (freshDoc.exists()) {
                setUserData(freshDoc.data() as UserData);
                setRole("fan");
              }
            } catch (writeError) {
              console.warn("Could not create user document (permission denied or offline):", writeError);
              // Fallback to local state if write fails
              setUserData(defaultData);
              setRole("fan");
            }
          }
        } catch (error: any) {
          // If it's a permission error, it might be a race condition.
          // We'll set a default userData so the UI doesn't break.
          const isPermissionError = error?.code === 'permission-denied' ||
                                    error?.message?.includes('permissions') ||
                                    error?.message?.includes('Missing or insufficient permissions');

          if (isPermissionError) {
             console.log("Auth sync: using local state while Firestore propagates.");
             setUserData({
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || "User",
                email: firebaseUser.email,
                role: "fan",
                joinedDate: new Date().toISOString()
             });
          } else {
            console.error("Error fetching user data:", error);
          }
          setRole("fan");
        }
      } else {
        setUser(null);
        setRole("guest");
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    const auth = getFirebaseAuth();
    try {
      if (auth) {
        await firebaseSignOut(auth!);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUserData = async (newData: Partial<UserData>) => {
    const auth = getFirebaseAuth();
    const db = getFirebaseDb();

    if (!auth || !auth.currentUser || !db) {
      console.error("Update failed: Firebase not initialized or no authenticated user.");
      return;
    }

    try {
      const uid = auth.currentUser.uid;
      const docRef = doc(db!, "users", uid);

      // Update Firestore
      await setDoc(docRef, newData, { merge: true });

      // Fetch fresh data to ensure local state is perfectly in sync with server
      const freshDoc = await getDoc(docRef);
      if (freshDoc.exists()) {
        setUserData(freshDoc.data() as UserData);
      } else {
        // Fallback to optimistic update if fetch fails
        setUserData((prev) => (prev ? { ...prev, ...newData } : null));
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, userData, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
