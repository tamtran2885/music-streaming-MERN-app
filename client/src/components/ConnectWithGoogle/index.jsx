import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../../context/authContext";
import googleIcon from '../../assets/images/googleicon.svg';
import axios from 'axios';


const ConnectWithGoogle = () => {

      const { loginWithGoogle } = useAuth();

      const navigate = useNavigate()
      const [credentials, setCredentials] = useState({});

      const [values, setValues] = useState({
            firstName: "",
            lastName: "",
            birthday: "",
            country: "",
            profile: "",
            email: "",
            firebaseUser: ""
      });


      const registerWithGoogle = async () => {
            try {
                  await loginWithGoogle()
                        .then((userCredentials) => {
                              console.log(userCredentials.user.accessToken)
                              console.log(userCredentials.user.displayName)
                              console.log(userCredentials.user.uid)
                              console.log(userCredentials.user.email)
                              setCredentials(userCredentials)
                        })
                  const config = {
                        headers: {
                              "Content-Type": "multipart/form-data",
                              Authorization: "Bearer " + credentials.user.accessToken
                        },
                  };
                  const data = {
                        firstName: credentials.user.displayName,
                        lastName: "",
                        birthday: "",
                        country: "",
                        profile: "",
                        email: credentials.user.email,
                        firebaseUser: credentials.user.uid
                  }
                  // set user to mongo
                  await axios.post("http://localhost:4000/api/user", config, data)
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