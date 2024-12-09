// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e3555.firebaseapp.com",
  projectId: "mern-estate-e3555",
  storageBucket: "mern-estate-e3555.firebasestorage.app",
  messagingSenderId: "58649262902",
  appId: "1:58649262902:web:a5b95504a98872c16b5197"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);