import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Genres from '../../components/Genres';
import Albums from '../../components/Albums';
import MusicPlayer from '../../components/MusicPlayer';
import TrackRows from "../../components/TrackRows";
import upload from "../../assets/images/upload.svg";
import { getFavTracksByUser } from "../../redux/track/actions";

import { useAuth } from "../../context/authContext";
import { useSelector } from "react-redux";
import { connect, useDispatch } from "react-redux";

const TrackPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const loggedToken = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        if (!loggedToken) {
            navigate("/login")
        }
        if (loggedToken) {
            setTimeout(async () => {
                dispatch(getFavTracksByUser(userId));
            }, 3000)
        }
    })

    const allTracks = useSelector((state) => state.track.allTracks.data);
    const myTracks = useSelector((state) => state.track.myTracks.data);
    // const favTracksByUser = useSelector((state) => state.track.favTracksByUser);

    const [totalTracks, setTotalTracks] = useState([]);

    useEffect(() => {
        setTotalTracks(myTracks);
    }, [myTracks])

    const handlePopular = () => {
        // console.log("allTracks")
        setTotalTracks(allTracks)
    };

    const handleMine = () => {
        // console.log("myTracks")
        setTotalTracks(myTracks)
    };

    // const handleFav = () => {
    //     setTotalTracks(favTracksByUser)
    // }

    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="Songs" handleMine={handleMine} handlePopular={handlePopular} />
                <div className='tracks__absolute'>
                    <div className='tracks__display'>
                        <div className="tracks__title">
                            <h2 className="tittle">Uploaded</h2>
                            <Link className='link' to="/track/add">
                                <button className="button">Upload Song</button>
                                <img className="upload" src={upload} alt="Upload" />
                            </Link>
                        </div>
                        <TrackRows totalTracks={totalTracks} />
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