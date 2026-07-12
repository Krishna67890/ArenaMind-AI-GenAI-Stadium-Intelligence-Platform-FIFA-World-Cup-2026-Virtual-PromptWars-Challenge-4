"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { auth, db } from "@/services/firebase";
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
    // Set persistence to local (keeps user logged in across refreshes)
    setPersistence(auth, browserLocalPersistence).catch(console.error);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Fetch extended user data from Firestore
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          let userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            // Create default profile if not exists
            const defaultData = {
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
            await setDoc(userDocRef, defaultData);
            userDoc = await getDoc(userDocRef);
          }

          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setUserData(data);
            setRole(data.role || "fan");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // If it's a permission error, it might be a race condition.
          // We'll set a default userData so the UI doesn't break.
          if (error && typeof error === 'object' && 'code' in error && error.code === 'permission-denied') {
             setUserData({
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || "User",
                email: firebaseUser.email,
                role: "fan",
                joinedDate: new Date().toISOString()
             });
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
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUserData = async (newData: Partial<UserData>) => {
    if (!auth.currentUser) {
      console.error("Update failed: No authenticated user.");
      return;
    }

    try {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, "users", uid);

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
