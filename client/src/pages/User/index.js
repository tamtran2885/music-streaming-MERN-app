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
import { getPlaylistsByUser } from "../../redux/playlist/actions";

const User = ({ myTracks, myPlaylists, favTracksByUser }) => {
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
      }, 3000);
    }
  }, [dispatch]);

  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    profilePicture: "",
    email: "",
  });

  const { pathname } = useLocation();

  // GET ID FROM URL
  const getIdFromURL = () => {
    const pathSplit = pathname.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  // axios get + get the token in headers
  const APIcall = async () => {
    const userReq = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${getIdFromURL()}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setUserProfile(userReq.data);
  };

  const [myUploadTracks, setMyUploadTracks] = useState([]);
  const [myCreatedPlaylists, setMyCreatedPlaylists] = useState([]);
  const [myFavTracks, setMyFavTracks] = useState([]);

  useEffect(() => {
    setMyUploadTracks(myTracks);
    setMyCreatedPlaylists(myPlaylists);
    setMyFavTracks(favTracksByUser);
  }, [myTracks, myPlaylists, favTracksByUser]);

  console.log(myUploadTracks);

  return (
    <>
      <div className="dashboard__background">
        <Navbar page="UserName" />
        {/*<h1>Welcome {mongoUser.firstName}!</h1>*/}
        <div className="dashboard__absolute">
          <div className="dashboard__display">
            <div className="created__content">
              <h2>Playlists</h2>
              <button>Create</button>
              <p>Here show playlists</p>
              <h2>Songs</h2>
              <button>Upload</button>
              <p>Here show songs</p>
              <h2>Albums</h2>
              <button>Create</button>
              <p>Here show Albums</p>
            </div>
            <div className="followed__content">
              <h2>Playlists</h2>
              <p>Here show playlists</p>
              <h2>Songs</h2>
              <p>Here show songs</p>
              <h2>Albums</h2>
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
  };
};

const reduxHoc = connect(mapStateToProps);

export default reduxHoc(User);
