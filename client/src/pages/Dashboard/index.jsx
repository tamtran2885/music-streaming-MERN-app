import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import withLayout from "../../hoc/withLayout";

import { useAuth } from "../../context/authContext";
import axios from 'axios';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [mongoUser, setMongoUser] = useState({});

    console.log(user.uid);

    // const navigate = useNavigate()

    useEffect(() => {
        APIcall();
    }, []);

    const { pathname } = useLocation();

    // // GET ID FROM URL
    // const getIdFromURL = () => {
    //     const pathSplit = pathname.split("/");
    //     return pathSplit[pathSplit.length - 1];
    // };

    // axios get
    const APIcall = async () => {
        const userReq = await axios.get(`/api/user/${user.uid}`);
        setMongoUser(userReq.data);
    };

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

            <div>
                <h1>Dashboard</h1>
                <h1>{user.uid}</h1>
                <Link to={`/user`}>User Profile</Link>
                <button onClick={handleLogout} className='button__primary'>Log Out</button>
            </div>
        </>
    )
}

export default withLayout(Dashboard);

