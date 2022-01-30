import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import "dotenv/config";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FB_APIKEY,
  // authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  // projectId: process.env.REACT_APP_FB_PROJECTID,
  // storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_FB_APPID,

  apiKey: "AIzaSyCJeJGEGB2DdMb39qwhjohfGP7V2CuWDyU",
  authDomain: "apollofy-new.firebaseapp.com",
  projectId: "apollofy-new",
  storageBucket: "apollofy-new.appspot.com",
  messagingSenderId: "443917818732",
  appId: "1:443917818732:web:936986194639f59bd07149",
};

// console.log(process.env.REACT_APP_FB_APIKEY)

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
