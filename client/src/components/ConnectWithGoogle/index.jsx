import React from 'react';
import { useNavigate } from 'react-router-dom';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../../config/firebaseConfig.js"
import googleIcon from '../../assets/images/googleicon.svg';



const ConnectWithGoogle = () => {

      const provider = new GoogleAuthProvider();
      const navigate = useNavigate()



      const registerWithGoogle = () => {

            try {
                  signInWithPopup(auth, provider)
                        .then(userCredentials => {
                              console.log(userCredentials)
                        })

            } catch (error) {
                  console.log(error)
            }

            navigate("/")

      }
      return (
            <button type="button" onClick={registerWithGoogle} className="google__signin">
            <img className="google__icon" src={googleIcon} alt="TamTamGo Logo" />
            </button>
      )
};

export default ConnectWithGoogle;