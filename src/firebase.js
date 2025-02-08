import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey:  "AIzaSyChuhxxXs4ceAJxE7ptDUFUlAeJXDZSHFE",
  authDomain: "fir-dashboard-6061a.firebaseapp.com",
  projectId: "fir-dashboard-6061a",
  storageBucket: "fir-dashboard-6061a.firebasestorage.app",
  messagingSenderId: "820772765170",
  appId: "1:820772765170:web:d625a7224d9676e5bb7f6b"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
