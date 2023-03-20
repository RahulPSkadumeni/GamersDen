// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd6AS5IUH5vqc5EmioxD36Ievl5dEPMK0",
  authDomain: "gamers-den-77e7a.firebaseapp.com",
  projectId: "gamers-den-77e7a",
  storageBucket: "gamers-den-77e7a.appspot.com",
  messagingSenderId: "365512150496",
  appId: "1:365512150496:web:aac5de8be449ce566e2f85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
