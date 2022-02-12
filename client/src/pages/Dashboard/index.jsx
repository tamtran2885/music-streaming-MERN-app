import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Navbar from '../../components/Navbar';
import Playlists from '../../components/Playlists';
import Songs from '../../components/Songs';
import Genres from '../../components/Genres';
import Albums from '../../components/Albums';
import MusicPlayer from '../../components/MusicPlayer';

import { connect, useDispatch } from "react-redux";
import { getAllTracks, getTracksByUser } from "../../redux/track/actions";
import { getAllPlaylists, getPlaylistsByUser } from "../../redux/playlist/actions";

import { useAuth } from "../../context/authContext";
import axios from 'axios';

<<<<<<< HEAD
const Dashboard = ({ myPlaylists, myTracks, allPlaylists, allTracks }) => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [mongoUser, setMongoUser] = useState({});
    const token = localStorage.getItem("token")
    // window.localStorage.setItem("token", token)
    // console.log(JSON.stringify(user));
=======
const Dashboard = ({myPlaylists, myTracks, allPlaylists, allTracks}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [mongoUser, setMongoUser] = useState({});
    const token = user.accessToken
    window.localStorage.setItem("token", token)
>>>>>>> playlist

    // console.log(allPlaylists);
    // console.log(myPlaylists);
    // useEffect(() => {
    //     const loggedToken = localStorage.getItem("token");
    //     if (!loggedToken) {
    //         navigate("/login")
    //     }
    // })

    useEffect(() => {
        if (token) {
            setTimeout(async () => {
                if (token) {
                    APIcall();
                    dispatch(getAllTracks());
                    dispatch(getAllPlaylists());
                    dispatch(getTracksByUser(user.uid));
                    dispatch(getPlaylistsByUser(user.uid));
                }
            }, 3000)
        }

    }, [dispatch, token]);

    const [tracksDashboard, setTracksDashboard] = useState([]);
    const [playlistsDashboard, setPlaylistsDashboard] = useState([]);

    useEffect(() => {
        setTracksDashboard(allTracks);
        setPlaylistsDashboard(allPlaylists);
    }, [allTracks, allPlaylists])

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
        setPlaylistsDashboard(allPlaylists)
    };

    const handleMine = () => {
        setTracksDashboard(myTracks)
        setPlaylistsDashboard(myPlaylists)
    };

    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="Popular Now" handleMine={handleMine} handlePopular={handlePopular} mongoUser={mongoUser} />
                {/*<h1>Welcome {mongoUser.firstName}!</h1>*/}
                <div className='dashboard__absolute'>
                    <div className='dashboard__display'>
                        <Playlists playlistsDashboard={playlistsDashboard} />
                        <Songs tracksDashboard={tracksDashboard} />
                    </div>
                    <div className='dashboard__side'>
                        <Genres />
                        {/* <Albums /> */}
                    </div>
                </div>
                <MusicPlayer />
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        allTracks: state.track.allTracks.data,
        myTracks: state.track.myTracks.data,
        allPlaylists: state.playlist.allPlaylists.data,
        myPlaylists: state.playlist.myPlaylists.data
    }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Dashboard);
