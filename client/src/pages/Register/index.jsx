import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import RegisterInput from "../../components/RegisterInput";

import axios from "axios";

import {useAuth} from "../../context/authContext"
import ConnectWithGoogle from '../../components/ConnectWithGoogle';

const Register = () => {

    const { signUpWithEmailAndPassword } = useAuth();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "multipart/form-data",
            },
        };

        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("birthday", values.birthday);
        formData.append("country", values.country);
        formData.append("profile", values.profile);
        formData.append("email", values.email);
        formData.append("password", values.password);

        try {
            const firebaseUser = await signUpWithEmailAndPassword(registerEmail, registerPassword)

            firebaseUser ? await axios.post("http://localhost:4000/api/user", formData, config, firebaseUser) : console.log("ho");

            console.log(firebaseUser)
            console.log(formData);
            navigate("/login")
        } catch (error) {
            console.log(error.message);
        }
    }

    const onChange = (name) => (e) => {
        const value = name === "profile" ? e.target.files[0] : e.target.value;
        setValues({ ...values, [name]: value})

        setRegisterEmail(values.email)
        setRegisterPassword(values.password)
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <RegisterInput name="firstName" type="text" placeholder="First Name"  onChange={onChange("firstName")} required />
                <RegisterInput name="lastName" type="text" placeholder="Last Name"  onChange={onChange("lastName")} required />
                <RegisterInput name="birthday" type="date" placeholder="Birthday"  onChange={onChange("birthday")} />
                <RegisterInput name="country" type="text" placeholder="Country"  onChange={onChange("country")} />
                <RegisterInput name="profile" type="file" placeholder="Upload Image"  onChange={onChange("profile")}  />
                <RegisterInput name="email" type="email" placeholder="Email"  onChange={onChange("email")} required/>
                <RegisterInput name="password" type="password" placeholder="Password"  onChange={onChange("password")} required/>
                <RegisterInput name="confirmPassword" type="password" placeholder="Confirm Password"  onChange={onChange("confirmPassword")} required/>
                <button type="submit">Submit</button>
            </form>
            <ConnectWithGoogle />
        </>
    )
}

export default Register;