import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import RegisterInput from "../../components/RegisterInput";
import userValidation from "../../utils/validation/userValidation"

import axios from "axios";

import { useAuth } from "../../context/authContext"
import ConnectWithGoogle from '../../components/ConnectWithGoogle';
import logo from '../../assets/images/logo.svg';
import upload from "../../assets/images/upload.svg";

const Register = () => {
    const { signUpWithEmailAndPassword } = useAuth();

    // console.log(JSON.stringify(user));

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
        firebaseUser: ""
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(userValidation(values))



        try {
            const firebaseUser = await signUpWithEmailAndPassword(registerEmail, registerPassword)
            console.log(firebaseUser.user.accessToken)




            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("birthday", values.birthday);
            formData.append("country", values.country);
            formData.append("profile", values.profile);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("firebaseUser", firebaseUser.user.uid)

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + firebaseUser.user.accessToken
                },
            };

            firebaseUser ? await axios.post("https://tamtamgo.herokuapp.com/api/user", formData, config) : console.log("ho");

            navigate("/login")
        } catch (error) {
            console.log(error.message);
        }
    }

    const onChange = (name) => (e) => {
        const value = name === "profile" && e.target.files ? e.target.files[0] : e.target.value;
        setValues({ ...values, [name]: value })

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
                            <RegisterInput value={values.firstName} className="form__input" name="firstName" type="text" placeholder="First Name" onChange={onChange("firstName")} />
                            {errors.firstName && <p>{errors.firstName}</p>}
                            <RegisterInput value={values.lastName} className="form__input" name="lastName" type="text" placeholder="Last Name" onChange={onChange("lastName")} />
                            {errors.lastName && <p>{errors.lastName}</p>}
                            <RegisterInput className="form__input" name="birthday" type="text" placeholder="Birthday" onChange={onChange("birthday")} />
                            <RegisterInput className="form__input" name="country" type="text" placeholder="Country" onChange={onChange("country")} />
                            <label for="file"><p className='file'>Profile Picture</p></label>
                            <RegisterInput id="file" accept="image/*" className="form__input" name="profile" type="file" placeholder="Upload Image" onChange={onChange("profile")} />
                            <img className="upload" src={upload} alt="Upload" />
                            <RegisterInput value={values.email} className="form__input" name="email" type="email" placeholder="Email" onChange={onChange("email")} />
                            {errors.email && <p>{errors.email}</p>}
                            <RegisterInput value={values.password} className="form__input" name="password" type="password" placeholder="Password" onChange={onChange("password")} />
                            {errors.password && <p>{errors.password}</p>}
                            <RegisterInput value={values.confirmPassword} className="form__input" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={onChange("confirmPassword")} />
                            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                            <div className='form__options'>
                                <label className="b-contain">
                                    I accept the terms of the agreement.
                                    <input type="checkbox" />
                                    <div className="b-input"></div>
                                </label>
                            </div>
                            <div className='form__questions'>
                                <p>Already have an account?<br /> Please, <Link className="link" to="/login">log in.</Link></p>
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
                <p>TamTamGo App © 2022 | <a className="link" href="https://assemblerschool.com/" target="_blank" rel="noreferrer">Assembler School</a> Jun21 Final Project</p>
                <p>Developed with love by Tam Team</p>
            </div>
        </>
    )
}

export default Register;