import React, { useState, useEffect } from "react";
import Genre from "../Genre";
import play from "../../assets/images/playbutton.svg";
import star from "../../assets/images/star.svg";
import staractive from "../../assets/images/staractive.svg";

import { useLocation } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";

import { getCurrentPlaylistInfo, unfollowPlaylist, followPlaylist, getAllPlaylists, getPlaylistsByUser } from "../../redux/playlist/actions";

const PlaylistSidebar = ({creator, currentPlaylistInfo}) => {
    const dispatch = useDispatch();
    const uid = sessionStorage.getItem("userId");
    const { pathname } = useLocation();
    // const [follow, setFollow] = useState(false);
    // console.log(playlistInfo);

    // GET ID FROM URL
    const getIdFromURL = () => {
        const pathSplit = pathname.split("/");
        return pathSplit[pathSplit.length - 1];
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch(getCurrentPlaylistInfo(getIdFromURL()));
        }, 1000)
    }, [dispatch]);

    const [playlistGeneralInfo, setPlaylistGeneralInfo] = useState("");

    useEffect(() => {
        setPlaylistGeneralInfo(currentPlaylistInfo)
    }, [currentPlaylistInfo])

    const { followedBy } = playlistGeneralInfo;
    
    const getNoFollowers = () => {
        if (followedBy) {
            return followedBy.length;
        }
        return;
    }

    const checkFollow = (uid) => {
        if (followedBy && followedBy.filter((item) => item.firebaseUser === uid).length === 0) {
            return false;
        } else {
            return true;
        }
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         setFollow(checkFollow(uid))
    //     }, 1000)
    // }, [uid])

    const handleToggle = () => {
        if (checkFollow(uid)) {
            dispatch(unfollowPlaylist(playlistGeneralInfo._id, uid));
            dispatch(getAllPlaylists());
            dispatch(getPlaylistsByUser(uid));
            // setFollow(!follow);
        } else {
            dispatch(followPlaylist(playlistGeneralInfo._id, uid));
            dispatch(getAllPlaylists());
            dispatch(getPlaylistsByUser(uid))
            // setFollow(!follow)
        }
    }

    // console.log(checkFollow(uid))
    // console.log(currentPlaylistInfo)

    return (
        <div className='dashboard__side'>
                        <p>Created by <span className="creator">{creator && creator.firstName} {creator && creator.lastName}</span></p>
                        <p>{getNoFollowers() && getNoFollowers() > 1 ? <div>{getNoFollowers()} followers</div>: <div>{getNoFollowers()} follower</div>}</p>
                        <div className="genre">
                            <Genre />
                        </div>
                        <button className="button play"><img src={play} alt="Play" /></button>
                        {checkFollow(uid) === false ? (<button className="button follow" onClick={handleToggle}>
                            <img
                                src={star}
                                alt="UnFollow"
                            /></button>
                        ) : (<button className="button follow" onClick={handleToggle}>
                            <img
                                src={staractive}
                                alt="Follow"
                            /></button>
                        )}
                    </div>
    )
}

const mapStateToProps = state => {
    return {
        currentPlaylistInfo: state.playlist.currentPlaylistInfo
    }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(PlaylistSidebar);