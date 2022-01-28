import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
      // apiKey: process.env.REACT_APP_FB_APIKEY,
      // authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
      // projectId: process.env.REACT_APP_FB_PROJECTID,
      // storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
      // messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
      // appId: process.env.REACT_APP_FB_APPID

      apiKey: "AIzaSyC_PbsF4nSUkV5ABlQUSIUb6FTYGlgF380",
      authDomain: "tamtamgo-2fa2e.firebaseapp.com",
      projectId: "tamtamgo-2fa2e",
      storageBucket: "tamtamgo-2fa2e.appspot.com",
      messagingSenderId: "576401086832",
      appId: "1:576401086832:web:0f3d820bd1699165e597b5"

};

// console.log(process.env.REACT_APP_FB_APIKEY)


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
