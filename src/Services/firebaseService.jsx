// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRPhSpLvNU0QVpE3oGDGmjfqn531H5cik",
  authDomain: "stayeasy02.firebaseapp.com",
  projectId: "stayeasy02",
  storageBucket: "stayeasy02.appspot.com",
  messagingSenderId: "377610076015",
  appId: "1:377610076015:web:a948115a727ed7ee26329a",
  measurementId: "G-YHXX93KMYM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
