// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "post-sandstories.firebaseapp.com",
  projectId: "post-sandstories",
  storageBucket: "post-sandstories.appspot.com",
  messagingSenderId: "836320049285",
  appId: "1:836320049285:web:6c45ef82f37f1487e911ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);