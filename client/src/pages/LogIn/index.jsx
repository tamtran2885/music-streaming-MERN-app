import React, { useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom';
// import ConnectWithGoogle from './ConnectWithGoogle';
import { auth } from "../../config/firebaseConfig.js"




const Login = () => {


    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const navigate = useNavigate()

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const login = async (e) => {
        e.preventDefault()
        console.log(loginEmail)
        console.log(loginPassword)

        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

            console.log(user)
            navigate("/home")
        } catch (error) {
            console.log(error.message)
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
                            If you are new to Spotify go to <span> <Link to="/new-account">Create New Account</Link></span>
                        </p>
                        <p>
                            If you need to contact  <Link to="/new-account">Get Support</Link>


                        </p>
                        {/* <ConnectWithGoogle /> */}
                    </div>
                </form>
            </div>
        </>
    )
};

export default Login;