// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-dcae5.firebaseapp.com",
  projectId: "mern-estate-dcae5",
  storageBucket: "mern-estate-dcae5.appspot.com",
  messagingSenderId: "1013289776105",
  appId: "1:1013289776105:web:7838905a1aa50595f81178"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);