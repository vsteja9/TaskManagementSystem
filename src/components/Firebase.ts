// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZnb9jtyTgUDVLuYVfnta0LykK5A1AmC0",
  authDomain: "taskmanagementsystem-1ff43.firebaseapp.com",
  projectId: "taskmanagementsystem-1ff43",
  storageBucket: "taskmanagementsystem-1ff43.appspot.com",
  messagingSenderId: "741962016888",
  appId: "1:741962016888:web:2b49f921ecd1aacabd258d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export default app;