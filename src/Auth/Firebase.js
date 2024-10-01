// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFeLBzwg2p18bvkTPvUrukSEvkGd_q8oA",
  authDomain: "netflix-6b7bd.firebaseapp.com",
  projectId: "netflix-6b7bd",
  storageBucket: "netflix-6b7bd.appspot.com",
  messagingSenderId: "1088586968601",
  appId: "1:1088586968601:web:8edf1a9008e24a411cc488",
  measurementId: "G-2B5MVQ69MG"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Set persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Optional: you can sign in here if you want to handle it automatically
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Auth state listener

// Export the auth object, provider, signInWithPopup, and signOut
export { auth, provider, signInWithPopup, signOut,onAuthStateChanged };
