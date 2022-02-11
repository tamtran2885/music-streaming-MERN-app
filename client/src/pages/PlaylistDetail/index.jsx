import React from "react";
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Genres from '../../components/Genres';
import Albums from '../../components/Albums';
import MusicPlayer from '../../components/MusicPlayer';
import TrackRows from "../../components/TrackRows";
import upload from "../../assets/images/upload.svg";

import { useAuth } from "../../context/authContext";
import Genre from "../../components/Genre";

const TrackPage = () => {
    const { user } = useAuth();

    const token = user.accessToken;
    console.log(token)


    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="PlaylistName" />
                <div className='tracks__absolute'>
                    <div className='dashboard__side'>
                        <p>Created by User</p>
                        <p>1 followers</p>
                        <Genre />
                        <button>Play</button>
                        <button>Follow</button>
                    </div>
                    <div className='tracks__display'>
                        <TrackRows />
                    </div>
                </div>
                <MusicPlayer />
            </div>
        </>
    )
}

export default TrackPage;