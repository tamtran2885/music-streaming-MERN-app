import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import RegisterInput from "../../components/RegisterInput";

import axios from "axios";

import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../../config/firebaseConfig.js"
import ConnectWithGoogle from '../../components/ConnectWithGoogle';
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
            label: "First Name",
            errorMessage: "First name is required",
            required: true,
        },
        {
            id: 2,
            name: "lastName",
            type: "text",
            placeholder: "Last Name",
            label: "Last Name",
            errorMessage: "Last name is required",
            required: true,
        },
        {
            id: 3,
            name: "birthday",
            type: "date",
            placeholder: "Birthday",
            label: "Birthday",
        },
        {
            id: 4,
            name: "country",
            type: "text",
            placeholder: "Country",
            label: "Country",
        },
        {
            id: 5,
            name: "profile",
            type: "file",
            placeholder: "Profile Picture",
            label: "Profile Picture",
        },
        {
            id: 6,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            errorMessage: "It should be a valid email address!",
            required: true,
        },
        {
            id: 7,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage:
                "Password should be 7-20 characters and include at least 1 letter, 1 number and 1 special character!",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$`,
            required: true,
        },
        {
            id: 8,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            label: "Confirm Password",
            errorMessage: "Passwords don't match!",
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
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                {inputs.map(input => (
                    <RegisterInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                ))}
                <button type="submit">Submit</button>
            </form>

            <ConnectWithGoogle />



        </>
    )
}

export default Register;