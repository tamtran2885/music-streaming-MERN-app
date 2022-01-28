import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import withLayout from "../../hoc/withLayout";

const Dashboard = () => {

    const [user, setUser] = useState({});

    const navigate = useNavigate()

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const logout = async () => {
        await signOut(auth)
        navigate("/login")
    }

    return (
        <>
            {user ? (
                <div>

                    <h1>Dashboard</h1>
                    <Link to={"/user"}>User Profile</Link>
                    <button onClick={logout} className='button__primary'>Log Out</button>
                </div>
            ) : (
                <h1>You are not authenticated</h1>
            )}


        </>
    )
}

export default withLayout(Dashboard);

