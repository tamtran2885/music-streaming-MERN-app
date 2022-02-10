import React, { useEffect, useState } from 'react';
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

const Dashboard = ({ allTracks, allPlaylists, myTracks, myPlaylists }) => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [mongoUser, setMongoUser] = useState({});
    const token = user.accessToken
    window.localStorage.setItem("token", token)
    // console.log(JSON.stringify(user));

    const [tracksDashboard, setTracksDashboard] = useState([]);
    const [playlistsDashboard, setPlaylistsDashboard] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // console.log(allPlaylists);
    // console.log(myPlaylists);




    useEffect(() => {

        if (token) {
            APIcall();

            setTimeout(() => {
                // dispatch(getAllTracks());
                // dispatch(getAllPlaylists());
                // dispatch(getTracksByUser(user.uid));
                // dispatch(getPlaylistsByUser(user.uid));
                // console.log([...allTracks])
            }, 6000);




            // setTracksDashboard([...tracksDashboard]);
            // setPlaylistsDashboard([...playlistsDashboard]);


        }


    }, [dispatch, token, tracksDashboard, playlistsDashboard]);



    const APIcall = async () => {
        const userReq = await axios.get(`/api/user/${user.uid}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        setMongoUser(userReq.data);
        setTracksDashboard([...allTracks]);
        setPlaylistsDashboard([...allPlaylists]);


    };



    const handlePopular = () => {
        setTracksDashboard(allTracks)
        setPlaylistsDashboard(allPlaylists)
    };

    const handleMine = () => {
        setTracksDashboard(myTracks)
        setPlaylistsDashboard(myPlaylists)
    };

    const [num, setNum] = useState(2)

    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="Popular Now" handleMine={handleMine} handlePopular={handlePopular} mongoUser={mongoUser} />
                {/*<h1>Welcome {mongoUser.firstName}!</h1>*/}
                <div className='dashboard__absolute'>
                    <div className='dashboard__display'>
                        <Playlists playlistsDashboard={playlistsDashboard} />
                        <Songs tracksDashboard={tracksDashboard} num={num} />
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
        allTracks: state.track.allTracks.data,
        myTracks: state.track.myTracks.data,
        allPlaylists: state.playlist.allPlaylists.data,
        myPlaylists: state.playlist.myPlaylists.data
    }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Dashboard);
