import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import RegisterInput from "../../components/RegisterInput";

import axios from "axios";

import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../../config/firebaseConfig.js"
import ConnectWithGoogle from '../../components/ConnectWithGoogle';
import logo from '../../assets/images/logo.svg';
// import { inputs } from "./inputData";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate()

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    profile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // console.log(values)

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      //errorMessage: "First name is required",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      //errorMessage: "Last name is required",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "text",
      placeholder: "Birthday",
    },
    {
      id: 4,
      name: "country",
      type: "text",
      placeholder: "Country",
    },
    {
      id: 5,
      name: "profile",
      type: "file",
      placeholder: "Profile Picture",
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "Email",
      //errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "Password",
      //errorMessage:
      //"Password should be 7-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$`,
      required: true,
    },
    {
      id: 8,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      //errorMessage: "Passwords don't match!",
      pattern: values.password,
      required: true,
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const submittedData = new FormData(e.target);
    //console.log(submittedData);
    // to get data from entries , use Object method
    // console.log(Object.fromEntries(data.entries()));
    const data = Object.fromEntries(submittedData.entries());
    // console.log(data);

    try {
      const firebaseUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)

      firebaseUser ? await axios.post("http://localhost:4000/api/user", data, config, firebaseUser) : console.log("ho");

      console.log(firebaseUser)
      navigate("/")
    } catch (e) {
      console.log(e)
    }

  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setRegisterEmail(values.email)
    setRegisterPassword(values.password)
  }

  // console.log(values);

  return (
    <>
      <div className='login__absolute'>
        <div className='logo__container'>
          <img src={logo} alt="TamTamGo Logo" />
        </div>
        <div className='login__container'>
          <h1 className='header'>Register</h1>
          <div className="form__container">
            <form className="form" onSubmit={handleSubmit}>
              {inputs.map(input => (
                <RegisterInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
              ))}
              <div className='form__options'>
                <label className="b-contain">
                  I accept the terms of the agreement.
                  <input type="checkbox"/>
                  <div className="b-input"></div>
                </label>
              </div>
              <div className='form__questions'>
                <p>Already have an account?<br /> Please, <Link className="link" to="/register">log in.</Link></p>
                  <div className='form__buttons'>
                    <ConnectWithGoogle />
                    <button type="submit">Sing up</button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="credits">
        <p>TamTamGo App © 2022 | <a className="link" href="https://assemblerschool.com/" target="_blank" rel="noreferrer" nofollow>Assembler School</a> Jun21 Final Project</p>
        <p>Developed with love by Tam Team</p>
      </div>
    </>
  )
}

export default Register;