// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyC_PbsF4nSUkV5ABlQUSIUb6FTYGlgF380",
      authDomain: "tamtamgo-2fa2e.firebaseapp.com",
      projectId: "tamtamgo-2fa2e",
      storageBucket: "tamtamgo-2fa2e.appspot.com",
      messagingSenderId: "576401086832",
      appId: "1:576401086832:web:0f3d820bd1699165e597b5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
