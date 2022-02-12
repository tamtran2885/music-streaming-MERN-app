import React from "react";
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import MusicPlayer from '../../components/MusicPlayer';
import TrackRows from "../../components/TrackRows";
import play from "../../assets/images/playbutton.svg";
import star from "../../assets/images/star.svg";

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
                        <div className="genre">
                            <Genre />
                        </div>
                        <button className="button play"><img src={play} alt="Play" /></button>
                        <button className="button follow"><img src={star} alt="Follow" /></button>
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