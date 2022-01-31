import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineGooglePlus } from 'react-icons/ai';

import { useAuth } from "../../context/authContext";


const ConnectWithGoogle = () => {

      const { loginWithGoogle } = useAuth();

      const navigate = useNavigate()

      const registerWithGoogle = async () => {
            try {
                  await loginWithGoogle()
                        .then(userCredentials => {
                              console.log(userCredentials)

                        })
                  navigate("/")
            } catch (error) {
                  console.log(error)
            }
      }

      return (
            <button type="button" onClick={registerWithGoogle} className="google__signin">
                  <AiOutlineGooglePlus className='google__icon' />
                  <p>Sign in with Google</p>
            </button>
      )
};

export default ConnectWithGoogle;