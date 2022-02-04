import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import MusicPlayer from '../../components/MusicPlayer';

// import withLayout from "../../hoc/withLayout";

import { useAuth } from "../../context/authContext";
// import axios from 'axios';

const Tracks = () => {
    const { user } = useAuth();

    // console.log(JSON.stringify(user));

    return (
        <>
            <div className='dashboard__background'>
                <Navbar />
                <h1>Welcome Guest!</h1>
                <Link to="/track/add"><button>Upload Song</button></Link>
                
                <div className='dashboard__absolute'>
                    
                </div>
                <MusicPlayer />
            </div>
        </>
    )
}

export default Tracks;