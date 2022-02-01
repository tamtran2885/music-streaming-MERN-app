import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/authContext";

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
            <form className="form" handleSubmit={handleResetPassword}>
                  {error && <p>{error}</p>}
                  <h3>Forgot Password</h3>
                  <label>Email</label>
                  <input
                        type="text"
                        className="form__input"
                        placeholder="Email address..."
                        onChange={(e) => setForgot(e.target.value)}
                  />
                  <button type="submit" className="button">Submit</button>
                  <div className='form__questions'>
                        <p>
                              If you need to contact  <Link to="/register">Get Support</Link>
                        </p>
                  </div>
            </form>
      );
};
export default ForgotPassword;