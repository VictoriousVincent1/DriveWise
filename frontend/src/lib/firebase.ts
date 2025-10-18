// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpo4pUlZnn2cwnJe5p8MT1am2__wnjU_0",
  authDomain: "drivewise-7ffef.firebaseapp.com",
  projectId: "drivewise-7ffef",
  storageBucket: "drivewise-7ffef.firebasestorage.app",
  messagingSenderId: "114530652361",
  appId: "1:114530652361:web:ada5abf7ef0c3331693d18",
  measurementId: "G-HRYSZ96801"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);