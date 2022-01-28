import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineGooglePlus } from 'react-icons/ai';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../../config/firebaseConfig.js"



const ConnectWithGoogle = () => {

      const provider = new GoogleAuthProvider();
      const navigate = useNavigate()



      const registerWithGoogle = () => {

            try {
                  signInWithPopup(auth, provider)
                        .then(userCredentials => {
                              console.log(userCredentials)
                              const name = userCredentials.user.displayName
                              const email = userCredentials.user.email
                              const token = userCredentials
                        })

            } catch (error) {
                  console.log(error)
            }

            navigate("/")

      }
      return (
            <button type="button" onClick={registerWithGoogle} className="google__signin">
                  <AiOutlineGooglePlus className='google__icon' />
                  <p>Sign in with Google</p>
            </button>
      )
};

export default ConnectWithGoogle;