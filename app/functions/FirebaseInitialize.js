// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ7ieEe5CNNFGllIHtzy4MZYOYWy0quNw",
  authDomain: "outfit-forecast-2.firebaseapp.com",
  projectId: "outfit-forecast-2",
  storageBucket: "outfit-forecast-2.appspot.com",
  messagingSenderId: "1069861698773",
  appId: "1:1069861698773:web:55128813e7f32a2a3bf65c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)