import React from "react";
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import MusicPlayer from '../../components/MusicPlayer';
import TrackRows from "../../components/TrackRows";

import { useAuth } from "../../context/authContext";

const TrackPage = () => {
    const { user } = useAuth();

    return(
        <>
            <div className='dashboard__background'>
                <Navbar page="Songs"/>
                <h1>Welcome Guest!</h1>
                <Link to="/track/add"><button>Upload Song</button></Link>
                <div>
                    <TrackRows />
                </div>
                <MusicPlayer />
            </div>
        </>
    )
}

export default TrackPage;