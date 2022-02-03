import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

import withLayout from "../../hoc/withLayout";

import { useAuth } from "../../context/authContext";
import axios from 'axios';

const Dashboard = () => {
    const { user } = useAuth();
    const [mongoUser, setMongoUser] = useState({});

    console.log(user);

    // const navigate = useNavigate()
    const token = user.accessToken;
    console.log(token)

    useEffect(() => {
        if(token){
            APIcall(token);
        }
    }, [token]);

    // const { pathname } = useLocation();

    // // GET ID FROM URL
    // const getIdFromURL = () => {
    //     const pathSplit = pathname.split("/");
    //     return pathSplit[pathSplit.length - 1];
    // };

    // axios get
    const APIcall = async () => {
        const userReq = await axios.get(`/api/user/${user.uid}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        setMongoUser(userReq.data);
    };

    return (
        <>

            <div>
                <h1>Hola {mongoUser.firstName}</h1>
                <h1>{user.uid}</h1>
                {/* <Link to={`/user/${user.uid}`}>User Profile</Link>
                <button onClick={handleLogout} className='button__primary'>Log Out</button> */}
                {/* <audio src="" controls></audio> */}
            </div>
        </>
    )
}

export default withLayout(Dashboard);

