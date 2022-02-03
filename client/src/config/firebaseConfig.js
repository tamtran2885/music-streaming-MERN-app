import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import "dotenv/config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FB_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);