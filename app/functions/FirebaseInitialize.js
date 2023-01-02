// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-Rej1SAv6YQZJVQKBFWtXMs5wMtdDO28",
  authDomain: "outfit-forecast-final.firebaseapp.com",
  projectId: "outfit-forecast-final",
  storageBucket: "outfit-forecast-final.appspot.com",
  messagingSenderId: "929567258241",
  appId: "1:929567258241:web:3a2d82660f743bdac2bf80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)