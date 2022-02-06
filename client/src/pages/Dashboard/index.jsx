import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Playlists from '../../components/Playlists';
import Songs from '../../components/Songs';
import Genres from '../../components/Genres';
import Albums from '../../components/Albums';
import MusicPlayer from '../../components/MusicPlayer';

import { connect, useDispatch } from "react-redux";
import { getTracks, getTracksByUser } from "../../redux/dashboard/actions";
import { useSelector } from "react-redux";

import { useAuth } from "../../context/authContext";
import axios from 'axios';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [mongoUser, setMongoUser] = useState({});
    const token = user.accessToken;
    // console.log(JSON.stringify(user));

    useEffect(() => {
        if (token) {
            APIcall();
            dispatch(getTracks());
            dispatch(getTracksByUser(user.uid));
        }
    }, [dispatch, token]);

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
            <div className='dashboard__background'>
                <Navbar page="Popular Now"/>
                <h1>Welcome {mongoUser.firstName}!</h1>
                {/* <h1>{user.uid}</h1> */}
                <div className='dashboard__absolute'>
                    <div className='dashboard__display'>
                        <Playlists />
                        <Songs />
                    </div>
                    <div className='dashboard__side'>
                        <Genres />
                        <Albums />
                    </div>
                </div>
                <MusicPlayer />
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
      tracks: state.dashboard.tracks,
      tracksByUser: state.dashboard.tracksByUser
    }
  }
  
  const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Dashboard);

