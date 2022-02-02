import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import "dotenv/config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FB_APPID,

  // Enrique

  // apiKey: "AIzaSyC_PbsF4nSUkV5ABlQUSIUb6FTYGlgF380",
  // authDomain: "tamtamgo-2fa2e.firebaseapp.com",
  // projectId: "tamtamgo-2fa2e",
  // storageBucket: "tamtamgo-2fa2e.appspot.com",
  // messagingSenderId: "576401086832",
  // appId: "1:576401086832:web:0f3d820bd1699165e597b5"

  // Tam

  // apiKey: "AIzaSyCJeJGEGB2DdMb39qwhjohfGP7V2CuWDyU",
  // authDomain: "apollofy-new.firebaseapp.com",
  // projectId: "apollofy-new",
  // storageBucket: "apollofy-new.appspot.com",
  // messagingSenderId: "443917818732",
  // appId: "1:443917818732:web:936986194639f59bd07149"

  // // Jaime

  // apiKey: "AIzaSyArycwXaNuxhtZv5p8_REqIS7fZ-rrHPrc",
  // authDomain: "tamtamgo-bba65.firebaseapp.com",
  // projectId: "tamtamgo-bba65",
  // storageBucket: "tamtamgo-bba65.appspot.com",
  // messagingSenderId: "1035748411457",
  // appId: "1:1035748411457:web:7585e764a94dcd5c1e1ec0"
};

// console.log(process.env.REACT_APP_FB_APIKEY)

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
