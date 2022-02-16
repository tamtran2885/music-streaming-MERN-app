import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../context/authContext";
import googleIcon from '../../assets/images/googleicon.svg';
import axios from 'axios';


const ConnectWithGoogle = () => {
      const profileDefaultURL = "https://res.cloudinary.com/dj30eyyuy/image/upload/v1644870925/bjtptfaj8eh5fg44v2rr.jpg"

      const { loginWithGoogle } = useAuth();


      const navigate = useNavigate()



      const registerWithGoogle = async () => {
            try {
                  const user = await loginWithGoogle()
                  console.log(user)
                  sessionStorage.setItem("token", user.user.accessToken)
                  sessionStorage.setItem("userId", user.user.uid)

                  user ? await axios.post(`${process.env.REACT_APP_API_URL}/api/user/google`,
                        {
                              headers: {
                                    Authorization: `Bearer ${user.user.accessToken}`
                              },
                              body: {
                                    firstName: user.user.displayName,
                                    lastName: "Enter your last name",
                                    birthday: "03/06/1991",
                                    country: "Introduce Your Country",
                                    email: user.user.email,
                                    password: "userPassword",
                                    firebaseUser: user.user.uid
                              }
                        },
                  ) : console.log("ho")


                  // set user to mongo

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