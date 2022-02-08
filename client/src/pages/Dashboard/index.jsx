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

    const allPlaylists = useSelector((state) => state.playlist.allPlaylists.data);
    const myPlayLists = useSelector((state) => state.playlist.myPlayLists.data);

    const [tracksDashboard, setTracksDashboard] = useState(allTracks);
    const [playlistsDashboard, setPlaylistsDashboard] = useState(allPlaylists);

    console.log(allPlaylists);
    console.log(myPlayLists);

    useEffect(() => {
        if (token) {
            APIcall();
            dispatch(getAllTracks());
            dispatch(getTracksByUser(user.uid));
            dispatch(getAllPlaylists());
            dispatch(getPlaylistsByUser(user.uid));
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
        setPlaylistsDashboard(allPlaylists)
    };

    const handleMine = () => {
        setTracksDashboard(myTracks)
        setPlaylistsDashboard(myPlayLists)
    };


    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="Popular Now" handleMine={handleMine} handlePopular={handlePopular} />
                {/*<h1>Welcome {mongoUser.firstName}!</h1>*/}
                <div className='dashboard__absolute'>
                    <div className='dashboard__display'>
                        <Playlists playlistsDashboard={playlistsDashboard}/>
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
      myTracks: state.track.myTracks,
      allPlaylists: state.playlist.allPlaylists,
      myPlayLists: state.playlist.myPlayLists
    }
  }
  
  const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Dashboard);

