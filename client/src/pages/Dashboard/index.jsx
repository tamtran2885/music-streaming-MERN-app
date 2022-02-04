import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

import withLayout from "../../hoc/withLayout";

import { useAuth } from "../../context/authContext";
import axios from 'axios';

const Dashboard = () => {
    const { user } = useAuth();
    const [mongoUser, setMongoUser] = useState({});


    // const navigate = useNavigate()
    const token = user.accessToken;

    useEffect(() => {
        if (token) {
            APIcall(token);
        }
    }, [token]);



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
            </div>
        </>
    )
}

export default withLayout(Dashboard);

