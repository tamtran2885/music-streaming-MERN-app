import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext";

import ConnectWithGoogle from '../../components/ConnectWithGoogle/index.jsx';

const Login = () => {

    const { logInWithEmailAndPassword } = useAuth();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const navigate = useNavigate()

    const [user, setUser] = useState({});
    const [error, setError] = useState("");


    const login = async (e) => {
        e.preventDefault()
        // console.log(loginEmail)
        // console.log(loginPassword)

        try {
            await logInWithEmailAndPassword(loginEmail, loginPassword)
            navigate("/")
        } catch (error) {
            // console.log(error.message);
            setError(error.message);
        }
    }

    return (
        <>
            <h1 className='header'>Log In</h1>

            <p>{user?.email || user === undefined + "creado con éxito!"}</p>

            <div className="form__container">
                <form className="form" onClick={login}>
                    <label>Email</label>
                    <input
                        type="text"
                        className="form__input"
                        placeholder="Email address..."
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        className="form__input"
                        placeholder="Introduce your password..."
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button type="submit" className="button__primary">Log in</button>
                    <div className='form__questions'>
                        <p>
                            If you are new to Spotify go to  <Link to="/register">Create New Account</Link>
                        </p>
                        <p>
                            If you need to contact  <Link to="/support">Get Support</Link>
                        </p>
                    </div>
                </form>
                <ConnectWithGoogle />

            </div>
        </>
    )
};

export default Login;