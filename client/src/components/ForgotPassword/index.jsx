import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/authContext";
import logo from "../../assets/images/logo.svg";

const ForgotPassword = () => {
      const emailRef = useRef()
      const { resetPassword } = useAuth();
      const [error, setError] = useState();
      const [message, setMessage] = useState();
      const [loading, setLoading] = useState(false)

      const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setMessage("");
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setMessage("Please check your email to reset your new password")
        } catch (err) {
            setError("Failed to reset password")
        }
      }

      return (
        <>
        <div className="login__absolute">
            <div className="logo__container">
                <img src={logo} alt="TamTamGo Logo" />
            </div>
            <div className="login__container">
          <form className="form" onSubmit={handleResetPassword}>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
            <h3>Forgot Password</h3>
            <input
              type="text"
              className="form__input"
              placeholder="Email address..."
              ref={emailRef}
            />
            <div className="form__questions">
              <div className="form__buttons">
            <button disabled={loading} type="submit" className="button">Submit</button>
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