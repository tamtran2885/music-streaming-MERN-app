import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Playlists from '../../components/Playlists';
import Songs from '../../components/Songs';
import Genres from '../../components/Genres';
import Albums from '../../components/Albums';
import MusicPlayer from '../../components/MusicPlayer';

import { connect, useDispatch } from "react-redux";
import { getAllTracks, getTracksByUser } from "../../redux/track/actions";
import { useSelector } from "react-redux";

import { useAuth } from "../../context/authContext";
import axios from 'axios';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [mongoUser, setMongoUser] = useState({});
    const token = user.accessToken;
    // console.log(JSON.stringify(user));

    const allTracks = useSelector((state) => state.track.allTracks.data);
    const myTracks = useSelector((state) => state.track.myTracks.data);

    const [tracksDashboard, setTracksDashboard] = useState(allTracks);

    useEffect(() => {
        if (token) {
            APIcall();
            dispatch(getAllTracks());
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


    const handlePopular = () => {
        setTracksDashboard(allTracks)
    };

    const handleMine = () => {
        setTracksDashboard(myTracks)
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
      allTrack: state.track.allTracks,
      myTracks: state.dashboard.myTracks
    }
  }
  
  const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Dashboard);

