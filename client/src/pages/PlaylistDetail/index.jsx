import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PlaylistTrackRows from '../../components/PlaylistTrackRows';
import upload from "../../assets/images/upload.svg";
import { getPlaylistDetails, getCurrentPlaylistInfo, unfollowPlaylist, followPlaylist, getAllPlaylists, getPlaylistsByUser } from "../../redux/playlist/actions";
import { connect, useDispatch } from "react-redux";
import play from "../../assets/images/playbutton.svg";

import Genre from "../../components/Genre";
import star from "../../assets/images/star.svg";
import staractive from "../../assets/images/staractive.svg";

const PlaylistDetail = ({currentPlaylist, currentPlaylistInfo}) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const loggedToken = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const uid = userId;

    useEffect(() => {
        if (!loggedToken) {
            navigate("/login")
        }
    })

    useEffect(() => {
        // GET ID FROM URL
        const getIdFromURL = () => {
            const pathSplit = pathname.split("/");
            return pathSplit[pathSplit.length - 1];
        };
        setTimeout(async () => {
            dispatch(getPlaylistDetails(getIdFromURL()));
            dispatch(getCurrentPlaylistInfo(getIdFromURL()))
        }, 3000)
    }, [dispatch, pathname]);

    const [playlistTrack, setPlaylistTrack] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState("");

    useEffect(() => {
        setPlaylistTrack(currentPlaylist);
        setPlaylistInfo(currentPlaylistInfo)
    }, [currentPlaylist, currentPlaylistInfo])

    const checkFollow = (uid) => {
        if (playlistInfo && playlistInfo.followedBy.filter((item) => item.firebaseUser === uid).length === 0) {
            return false;
        } else {
            return true;
        }
    };

    console.log(checkFollow(uid))

    const [follow, setFollow] = useState(checkFollow(uid));

    const handleToggle = () => {
        if (follow) {
            console.log("unfollow")
            dispatch(unfollowPlaylist(playlistInfo._id, uid));
            dispatch(getAllPlaylists());
            dispatch(getPlaylistsByUser(uid));
            setFollow(!follow);
        } else {
            console.log("follow")
            dispatch(followPlaylist(playlistInfo._id, uid));
            dispatch(getAllPlaylists());
            dispatch(getPlaylistsByUser(uid))
            setFollow(!follow);
        }
    };

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
                        {/* <button className="button follow"><img src={star} alt="Follow" /></button> */}
                        {follow ? (
                            <img
                                className="button follow"
                                src={staractive}
                                alt="Follow"
                                onClick={handleToggle}
                            />
                        ) : (
                            <img
                                className="button follow"
                                src={star}
                                alt="Follow"
                                onClick={handleToggle}
                            />
                        )}
                    </div>
                    <div className='tracks__display'>
                        <div className="tracks__title">
                            <h2 className="tittle">Uploaded</h2>
                            <Link className='link' to="/track/add">
                                <button className="button">Upload Song</button>
                                <img className="upload" src={upload} alt="Upload" />
                            </Link>
                        </div>
                        <PlaylistTrackRows playlistTrack={playlistTrack} playlistInfo={playlistInfo}/>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        currentPlaylist: state.playlist.currentPlaylist.data,
        currentPlaylistInfo: state.playlist.currentPlaylistInfo.data
    }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(PlaylistDetail);