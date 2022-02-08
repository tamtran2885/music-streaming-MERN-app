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

    const tracks = useSelector((state) => state.dashboard.tracks.data);
    const tracksByUser = useSelector((state) => state.dashboard.tracksByUser.data);

    const [tracksDashboard, setTracksDashboard] = useState(tracks);

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

    const handleMine = () => {
        setTracksDashboard(tracksByUser)
    };

    const handlePopular = () => {
        setTracksDashboard(tracks)
    };

    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="Popular Now" handleMine={handleMine} handlePopular={handlePopular}/>
                {/*<h1>Welcome {mongoUser.firstName}!</h1>*/}
                <div className='dashboard__absolute'>
                    <div className='dashboard__display'>
                        <Playlists />
                        <Songs tracksDashboard={tracksDashboard}/>
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

