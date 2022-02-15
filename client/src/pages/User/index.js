import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Playlists from "../../components/Playlists";
import Songs from "../../components/Songs";
import Genres from "../../components/Genres";
import Albums from "../../components/Albums";
import MusicPlayer from "../../components/MusicPlayer";

import { connect, useDispatch } from "react-redux";
import { getTracksByUser, getFavTracksByUser } from "../../redux/track/actions";
import {
  getPlaylistsByUser,
  getFollowingPlaylistsByUser,
} from "../../redux/playlist/actions";

const User = ({
  myTracks,
  myPlaylists,
  favTracksByUser,
  myFollowingPlaylists,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (token) {
      setTimeout(async () => {
        APIcall();
        dispatch(getTracksByUser(userId));
        dispatch(getPlaylistsByUser(userId));
        dispatch(getFavTracksByUser(userId));
        dispatch(getFollowingPlaylistsByUser(userId));
      }, 3000);
    }
  }, [dispatch]);

  const [userProfile, setUserProfile] = useState({});

  const { pathname } = useLocation();

  // GET ID FROM URL
  const getIdFromURL = () => {
    const pathSplit = pathname.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  // axios get + get the token in headers
  const APIcall = async () => {
    const userReq = await axios.get(`/api/user/${getIdFromURL()}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setUserProfile(userReq.data);
  };

  const [uploadTracks, setUploadTracks] = useState([]);
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [favTracks, setFavTracks] = useState([]);
  const [followingPlaylists, setFollowingPlaylists] = useState([]);

  useEffect(() => {
    setUploadTracks(myTracks);
    setCreatedPlaylists(myPlaylists);
    setFavTracks(favTracksByUser);
    setFollowingPlaylists(myFollowingPlaylists);
  }, [myTracks, myPlaylists, favTracksByUser, myFollowingPlaylists]);

  // console.log(createdPlaylists);
  // console.log(userProfile);
  // console.log(favTracksByUser);
  // console.log(followingPlaylists.result);

  return (
    <>
      <div className="dashboard__background">
        <Navbar userProfile={userProfile} />
        {/*<h1>Welcome {mongoUser.firstName}!</h1>*/}
        <div className="dashboard__absolute">
          <div className="dashboard__display">
            <div className="created__content">
              <h2>Created Playlists</h2>
              <button>Create</button>
              {createdPlaylists &&
                createdPlaylists.map((playlist) => (
                  <div>
                    {playlist.title}
                    <img
                      src={playlist.thumbnail}
                      alt="playlist"
                      style={{ width: "70px" }}
                    />
                  </div>
                ))}
              <h2>Uploaded Songs</h2>
              <button>Upload</button>
              {uploadTracks &&
                uploadTracks.map((track) => (
                  <div>
                    {track.title && track.title}/{track.artist && track.artist}/
                    {track.reproductions && track.reproductions}/
                    {track.duration && track.duration}
                  </div>
                ))}
              <h2>Created Albums</h2>
              <button>Create</button>
              <p>Here show Albums</p>
            </div>
            <div className="followed__content">
              <h2>Following Playlists</h2>
              {followingPlaylists &&
                followingPlaylists.map((playlist) => (
                  <div>
                    {playlist.title}
                    <img
                      src={playlist.thumbnail}
                      alt="playlist"
                      style={{ width: "70px" }}
                    />
                  </div>
                ))}
              <h2>Fav Songs</h2>
              {favTracks &&
                favTracks.map((track) => (
                  <div>
                    {track.title && track.title}/{track.artist && track.artist}/
                    {track.reproductions && track.reproductions}/
                    {track.duration && track.duration}
                  </div>
                ))}
              <h2>Liked Albums</h2>
              <p>Here show Albums</p>
            </div>
          </div>
        </div>
        <MusicPlayer />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myTracks: state.track.myTracks.data,
    myPlaylists: state.playlist.myPlaylists.data,
    favTracksByUser: state.track.favTracksByUser,
    myFollowingPlaylists: state.playlist.myFollowingPlaylists.data,
  };
};

const reduxHoc = connect(mapStateToProps);

export default reduxHoc(User);
