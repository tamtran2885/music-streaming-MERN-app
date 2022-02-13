import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Playlists from '../../components/Playlists';
import Songs from '../../components/Songs';
import Genres from '../../components/Genres';
// import Albums from '../../components/Albums';
import MusicPlayer from '../../components/MusicPlayer';
import {useNavigate} from "react-router-dom"

import { connect, useDispatch } from "react-redux";
import { getAllTracks, getTracksByUser, getFavTracksByUser } from "../../redux/track/actions";
import { getAllPlaylists, getPlaylistsByUser } from "../../redux/playlist/actions";

import { useAuth } from "../../context/authContext";
import axios from 'axios';

const Dashboard = ({ myPlaylists, myTracks, allPlaylists, allTracks }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [mongoUser, setMongoUser] = useState({});
    const loggedToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!loggedToken) {
            navigate("/login")
        }
        if (loggedToken) {
            setTimeout(async () => {
                APIcall();
                dispatch(getAllTracks());
                dispatch(getAllPlaylists());
                dispatch(getTracksByUser(userId));
                dispatch(getPlaylistsByUser(userId));
                dispatch(getFavTracksByUser(userId));
            }, 3000)
        }
    }, [dispatch, loggedToken]);

    const APIcall = async () => {
        const userReq = await axios.get(`/api/user/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + loggedToken,
            },
        });
        setMongoUser(userReq.data);
    };

    // console.log(mongoUser)

    const [tracksDashboard, setTracksDashboard] = useState([]);
    const [playlistsDashboard, setPlaylistsDashboard] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        setTracksDashboard(allTracks);
        setPlaylistsDashboard(allPlaylists);
    }, [allTracks, allPlaylists])

    const handlePopular = () => {
        setTracksDashboard(allTracks)
        setPlaylistsDashboard(allPlaylists)
    };

    const handleMine = () => {
        setTracksDashboard(myTracks)
        setPlaylistsDashboard(myPlaylists)
    };

    // const filterdTracks = playlistsDashboard.filter((track) => {
    //     return track.name.toLowerCase().includes(searchWord.toLowerCase())
    // })

    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="Popular Now" handleMine={handleMine} handlePopular={handlePopular} mongoUser={mongoUser} setSearchWord={setSearchWord}/>
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
        myPlaylists: state.playlist.myPlaylists.data,
    }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Dashboard);
