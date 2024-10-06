// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpv7aFB01F6mSmghkUrKMA5vSpNb544wg",
  authDomain: "booomerchess.firebaseapp.com",
  projectId: "booomerchess",
  storageBucket: "booomerchess.appspot.com",
  messagingSenderId: "126735957668",
  appId: "1:126735957668:web:cf1ed52769c87ca0d5f031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);