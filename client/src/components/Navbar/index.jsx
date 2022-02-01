import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout();
            // navigate("/login")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <nav>
            <h1>Nav Bar</h1>
            <Link to={`/user/${user.uid}`}>User Profile</Link>
            <button onClick={handleLogout} className='button__primary'>Log Out</button>
        </nav>
    )
}

export default Navbar;