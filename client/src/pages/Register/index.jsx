import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import RegisterInput from "../../components/RegisterInput";

import axios from "axios";

import {useAuth} from "../../context/authContext"
import ConnectWithGoogle from '../../components/ConnectWithGoogle';
import logo from '../../assets/images/logo.svg';

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
            <div className='login__absolute'>
                <div className='logo__container'>
                    <img src={logo} alt="TamTamGo Logo" />
                </div>
                <div className='login__container'>
                    <h1 className='header'>Register</h1>
                    <div className="form__container">
                        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <RegisterInput className="form__input" name="firstName" type="text" placeholder="First Name"  onChange={onChange("firstName")} required />
                            <RegisterInput className="form__input" name="lastName" type="text" placeholder="Last Name"  onChange={onChange("lastName")} required />
                            <RegisterInput className="form__input" name="birthday" type="date" placeholder="Birthday"  onChange={onChange("birthday")} />
                            <RegisterInput className="form__input" name="country" type="text" placeholder="Country"  onChange={onChange("country")} />
                            <RegisterInput className="form__input" name="profile" type="file" placeholder="Upload Image"  onChange={onChange("profile")}  />
                            <RegisterInput className="form__input" name="email" type="email" placeholder="Email"  onChange={onChange("email")} required/>
                            <RegisterInput className="form__input" name="password" type="password" placeholder="Password"  onChange={onChange("password")} required/>
                            <RegisterInput className="form__input" name="confirmPassword" type="password" placeholder="Confirm Password"  onChange={onChange("confirmPassword")} required/>
                            <div className='form__options'>
                                <label className="b-contain">
                                    I accept the terms of the agreement.
                                    <input type="checkbox" />
                                    <div className="b-input"></div>
                                </label>
                            </div>
                            <div className='form__questions'>
                                <p>Already have an account?<br /> Please, <Link className="link" to="/register">log in.</Link></p>
                                <div className='form__buttons'>
                                    <ConnectWithGoogle />
                                    <button type="submit">Sign up</button>
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