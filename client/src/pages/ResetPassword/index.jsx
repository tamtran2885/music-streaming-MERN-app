import React  from 'react';
import { Link } from "react-router-dom";
// import userValidation from "../../utils/validation/userValidation"

import ConnectWithGoogle from '../../components/ConnectWithGoogle';
import logo from '../../assets/images/logo.svg';

const ResetPassword = () => {
    return (
        <>
            <div className='login__absolute'>
                <div className='logo__container'>
                    <img src={logo} alt="TamTamGo Logo" />
                </div>
                <div className='login__container'>
                    <h1 className='header'>Reset Password</h1>
                    <div className="form__container">
                        <form className="form">
                        <input
                                type="password"
                                className="form__input"
                                placeholder="Old Password"
                                name="oldPassword"
                            />
                            <input
                                type="password"
                                className="form__input"
                                placeholder="New Password"
                                name="newPassword"
                            />
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