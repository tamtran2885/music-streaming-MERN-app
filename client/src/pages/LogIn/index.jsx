import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import logo from "../../assets/images/logo.svg";

import ConnectWithGoogle from "../../components/ConnectWithGoogle/index.jsx";

const Login = () => {
    const { logInWithEmailAndPassword } = useAuth();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            await logInWithEmailAndPassword(loginEmail, loginPassword).then(userCredentials => {
                // console.log(userCredentials.user)
                const token = userCredentials.user.accessToken
                const userFBid = userCredentials.user.uid
                sessionStorage.setItem("token", token)
                sessionStorage.setItem("userId", userFBid)
            })
            sessionStorage.getItem("token")
            navigate("/")
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="login__absolute">
                <div className="logo__container">
                    <img src={logo} alt="TamTamGo Logo" />
                </div>
                <div className="login__container">
                    <h1 className="header">Log In</h1>

                    <div className="form__container">
                        <form className="form" onClick={login}>
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Email"
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                className="form__input"
                                placeholder="Password"
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <div className='form__options'>
                                <label className="b-contain">
                                    Stay logged.
                                    <input type="checkbox" />
                                    <div className="b-input"></div>
                                </label>
                                <Link className="link" to="/forgot">Forgot your password?</Link>
                            </div>
                            <div className="form__questions">
                                <p>First time in TamTamGo?<br /> Please, <Link className="link" to="/register">sing up.</Link></p>
                                {/*<p>I'd like to reset password?<br /> Please, <Link className="link" to="/reset-password">Reset.</Link></p>*/}
                                <div className="form__buttons">
                                    <ConnectWithGoogle />
                                    <button type="submit" className="button">Log in</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="credits">
                <p className="credits__right">TamTamGo App © 2022 | <a className="link" href="https://assemblerinstitute.com/" target="_blank" rel="noreferrer">Assembler Institute of Technology</a> Jun21 Final Project</p>
                <p className="credits__left">Developed with love by Tam Team</p>
            </div>
        </>
    )
};

export default Login;