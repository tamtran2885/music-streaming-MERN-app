import React  from 'react';
import { useState } from 'react';
//import { Link } from "react-router-dom";
// import userValidation from "../../utils/validation/userValidation"

import { getAuth, updatePassword, reauthenticateWithCredential } from "firebase/auth";

import logo from '../../assets/images/logo.svg';

const ResetPassword = () => {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");

    const auth = getAuth();
    const user = auth.currentUser;

    const onChangeOld = (e) => {
        setOldPass({
            ...oldPass,
            [e.target.name]: e.target.value
        })
        console.log('onChangeOld')
    }

    const onChangeNew = (e) => {
        setNewPass({
            ...newPass,
            [e.target.name]: e.target.value
        })
        console.log('onChangeNew')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //const credential = promptForCredentials();

        //user.reauthenticateWithCredential(credential).then(() => {
            console.log("Change password 2 complete")
        //}).catch((error) => {
            //console.log(error)
        //});

        updatePassword(user, JSON.stringify(newPass)).then(() => {
            console.log("Change password complete")
            console.log(JSON.stringify(newPass))
        }).catch((error) => {
                console.log(error)
        });
    }

    return (
        <>
            <div className='login__absolute'>
                <div className='logo__container'>
                    <img src={logo} alt="TamTamGo Logo" />
                </div>
                <div className='login__container'>
                    <h1 className='header'>Reset Password</h1>
                    <div className="form__container">
                        <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="password"
                            onChange={onChangeOld}
                            className="form__input"
                            placeholder="Old Password"
                            name="oldPassword"
                        />
                        <input
                            type="password"
                            onChange={onChangeNew}
                            className="form__input"
                            placeholder="New Password"
                            name="newPassword"
                        />
                            <div className='form__questions'>
                                <div className='form__buttons'>
                                    <button type="submit">Submit</button>
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

export default ResetPassword;