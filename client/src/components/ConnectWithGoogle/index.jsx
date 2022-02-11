import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../context/authContext";
import googleIcon from '../../assets/images/googleicon.svg';


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
                  <img className="google__icon" src={googleIcon} alt="Gooogle Logo" />
            </button>
      )
};

export default ConnectWithGoogle;