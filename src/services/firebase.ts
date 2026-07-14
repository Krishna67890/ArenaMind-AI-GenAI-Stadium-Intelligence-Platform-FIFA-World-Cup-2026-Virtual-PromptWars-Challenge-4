import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

const isConfigValid =
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "undefined" &&
  firebaseConfig.apiKey.startsWith("AIza");

export const getFirebaseApp = () => {
  if (typeof window === "undefined" || !isConfigValid) return undefined;
  if (!app) {
    const existingApps = getApps();
    app = existingApps.length === 0 ? initializeApp(firebaseConfig) : existingApps[0];
  }
  return app;
};

export const getFirebaseAuth = () => {
  if (typeof window === "undefined" || !isConfigValid) return undefined;
  const app = getFirebaseApp();
  if (!app) return undefined;
  if (!auth) auth = getAuth(app);
  return auth;
};

export const getFirebaseDb = () => {
  if (typeof window === "undefined" || !isConfigValid) return undefined;
  const app = getFirebaseApp();
  if (!app) return undefined;
  if (!db) {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    });
  }
  return db;
};

export const getFirebaseStorage = () => {
  if (typeof window === "undefined" || !isConfigValid) return undefined;
  const app = getFirebaseApp();
  if (!app) return undefined;
  if (!storage) storage = getStorage(app);
  return storage;
};

// For backward compatibility while we migrate
export { auth, db, storage };
