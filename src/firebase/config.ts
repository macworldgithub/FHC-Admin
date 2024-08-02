import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuvjJY9Gnn7uThCWmrgPBBYxlZuE6XNU8",
  authDomain: "resume-8e7c2.firebaseapp.com",
  projectId: "resume-8e7c2",
  storageBucket: "resume-8e7c2.appspot.com",
  messagingSenderId: "276924636442",
  appId: "1:276924636442:web:a4af32b5483d5eb9d1e0a3",
  measurementId: "G-3W9C403J4N",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;
