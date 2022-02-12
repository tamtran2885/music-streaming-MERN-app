import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Genres from '../../components/Genres';
import Albums from '../../components/Albums';
import MusicPlayer from '../../components/MusicPlayer';
import TrackRows from "../../components/TrackRows";
import upload from "../../assets/images/upload.svg";

import { useAuth } from "../../context/authContext";

const TrackPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth();

    // const token = user.accessToken;
    // console.log(token)

    useEffect(() => {
        const loggedToken = localStorage.getItem("token");
        if (!loggedToken) {
            navigate("/login")
        }
    })

    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="Songs" />
                <div className='tracks__absolute'>
                    <div className='tracks__display'>
                        <div className="tracks__title">
                            <h2 className="tittle">Uploaded</h2>
                            <Link className='link' to="/track/add">
                                <button className="button">Upload Song</button>
                                <img className="upload" src={upload} alt="Upload" />
                            </Link>
                        </div>
                        <TrackRows />
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

export default TrackPage;