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

  apiKey: "AIzaSyDCBdhjngokLzrz1YlOBxWDWruS2kZfwC8",
  authDomain: "apollofy-3e2c5.firebaseapp.com",
  projectId: "apollofy-3e2c5",
  storageBucket: "apollofy-3e2c5.appspot.com",
  messagingSenderId: "138714127658",
  appId: "1:138714127658:web:ad81b82e37ef12f36d5253",
};

// console.log(process.env.REACT_APP_FB_APIKEY)

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
