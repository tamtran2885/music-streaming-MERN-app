import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PlaylistTrackRows from '../../components/PlaylistTrackRows';
import { getPlaylistDetails, getCurrentPlaylistInfo } from "../../redux/playlist/actions";
import { connect, useDispatch } from "react-redux";
import PlaylistSidebar from "../../components/PlaylistSidebar";
import axios from "axios";

const PlaylistDetail = ({currentPlaylist, currentPlaylistInfo}) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const loggedToken = sessionStorage.getItem("token");
    const [creator, setCreator] = useState({});

    useEffect(() => {
        if (!loggedToken) {
            navigate("/login")
        }
    })

    // GET ID FROM URL
    const getIdFromURL = () => {
        const pathSplit = pathname.split("/");
        return pathSplit[pathSplit.length - 1];
    };

    // Get playlist creator
    const getPlaylistCreator = async () => {
        const response = await axios.get(`http://localhost:4000/api/playlists/detailsUser/${getIdFromURL()}`,
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            });
        setCreator(response.data.user)
    }

    useEffect(() => {
        setTimeout(async () => {
            getPlaylistCreator();
            dispatch(getPlaylistDetails(getIdFromURL()));
            dispatch(getCurrentPlaylistInfo(getIdFromURL()));
        }, 1000)
    }, [dispatch]);

    const [playlistTrack, setPlaylistTrack] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState("");

    useEffect(() => {
        setPlaylistTrack(currentPlaylist);
        setPlaylistInfo(currentPlaylistInfo);
    }, [currentPlaylist, currentPlaylistInfo])

    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="PlaylistName" playlistInfo={playlistInfo}/>
                <div className='tracks__absolute'>
                    <PlaylistSidebar creator={creator}/>
                    <PlaylistTrackRows playlistTrack={playlistTrack} playlistInfo={playlistInfo}/>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        currentPlaylist: state.playlist.currentPlaylist,
        currentPlaylistInfo: state.playlist.currentPlaylistInfo
    }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(PlaylistDetail);