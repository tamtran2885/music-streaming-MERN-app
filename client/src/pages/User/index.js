import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Playlists from "../../components/Playlists";
import Songs from "../../components/Songs";
import Genres from "../../components/Genres";
import Albums from "../../components/Albums";
import MusicPlayer from "../../components/MusicPlayer";

import { useAuth } from "../../context/authContext";

import withLayout from "../../hoc/withLayout";

const User = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  // console.log(user.accessToken)
  const loggedToken = sessionStorage.getItem("token");

  useEffect(() => {
    if (!loggedToken) {
      navigate("/login");
    }
  });

  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    profilePicture: "",
    email: "",
  });

  const token = loggedToken;

  useEffect(() => {
    if (token) {
      APIcall();
    }
  }, []);

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

export default withLayout(User);
