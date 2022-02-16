import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Playlists from '../../components/Playlists';
import Songs from '../../components/Songs';
import Genres from '../../components/Genres';
// import Albums from '../../components/Albums';
import { useNavigate } from "react-router-dom"

import { connect, useDispatch } from "react-redux";
import { getAllTracks, getTracksByUser, getFavTracksByUser } from "../../redux/track/actions";
import { getAllPlaylists, getPlaylistsByUser } from "../../redux/playlist/actions";
import axios from 'axios';

const Dashboard = ({ myPlaylists, myTracks, allPlaylists, allTracks }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [mongoUser, setMongoUser] = useState({});
    const loggedToken = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        if (!loggedToken) {
            navigate("/login")
        }
        if (loggedToken) {
            setTimeout(async () => {
                APIcall(loggedToken, userId);
                dispatch(getAllTracks());
                dispatch(getAllPlaylists());
                dispatch(getTracksByUser(userId));
                dispatch(getPlaylistsByUser(userId));
                dispatch(getFavTracksByUser(userId));
            }, 1000)
        }
    }, [dispatch]);

    const APIcall = async (loggedToken, userId) => {
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

    useEffect(() => {
        setTracksDashboard(allTracks);
        setPlaylistsDashboard(allPlaylists);
    }, [allTracks, allPlaylists])

    const handlePopular = () => {
        setTracksDashboard(allTracks)
        setPlaylistsDashboard(allPlaylists)
    };

    const handleMine = async () => {
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
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        allTracks: state.track.allTracks,
        myTracks: state.track.myTracks,
        allPlaylists: state.playlist.allPlaylists,
        myPlaylists: state.playlist.myPlaylists,
    }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Dashboard);
