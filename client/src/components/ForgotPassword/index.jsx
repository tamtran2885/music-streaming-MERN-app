import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/authContext";
import logo from "../../assets/images/logo.svg";

const ForgotPassword = () => {

      const { user, resetPassword } = useAuth();
      const [forgot, setForgot] = useState();
      const [error, setError] = useState();

      const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(user.email);
            setError('We sent you an email. Check your inbox')
        } catch (err) {
            console.log(err.message);
        }
      }

      return (
        <>
        <div className="login__absolute">
            <div className="logo__container">
                <img src={logo} alt="TamTamGo Logo" />
            </div>
            <div className="login__container">
          <form className="form" handleSubmit={handleResetPassword}>
            {error && <p>{error}</p>}
            <h3>Forgot Password</h3>
            <input
              type="text"
              className="form__input"
              placeholder="Email address..."
              onChange={(e) => setForgot(e.target.value)}
            />
            <div className="form__questions">
              <div className="form__buttons">
            <button type="submit" className="button">Submit</button>
            </div>
            </div>
            <div className='form__options'>
              <p>Enter your mail to restore your password<br /> Or go to <Link className="link" to="/login">log in.</Link></p>
              <p>
                If you need to contact  <Link className="link" to="/register">Get Support</Link>
              </p>
            </div>
          </form>
          </div>
          </div>
        </>
      );
};
export default ForgotPassword;