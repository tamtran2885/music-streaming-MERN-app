import React from 'react';
import { Link } from 'react-router-dom';

import withLayout from "../../hoc/withLayout";

import { useAuth } from "../../context/authContext";

const Dashboard = () => {
    const {user, logout} = useAuth();

    console.log(user);

    // const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout();
            // navigate("/login")
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {/* {user ? (
                <div>

                    <h1>Dashboard</h1>
                    <Link to={"/user"}>User Profile</Link>
                    <button onClick={handleLogout} className='button__primary'>Log Out</button>
                </div>
            ) : (
                <h1>You are not authenticated</h1>
            )} */}

                <div>
                    <h1>Dashboard</h1>
                    <Link to={"/user/:id"}>User Profile</Link>
                    <button onClick={handleLogout} className='button__primary'>Log Out</button>
                </div>
        </>
    )
}

export default withLayout(Dashboard);

