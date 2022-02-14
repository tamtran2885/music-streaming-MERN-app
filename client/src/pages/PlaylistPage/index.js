import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import CreatedPlaylists from "../../components/CreatedPlaylists";
import { connect, useDispatch } from "react-redux";
import {
  getAllPlaylists,
  getPlaylistsByUser,
} from "../../redux/playlist/actions";

const PlaylistPage = ({ myPlaylists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedToken = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!loggedToken) {
      navigate("/login");
    }
    if (loggedToken) {
      setTimeout(async () => {
        dispatch(getAllPlaylists());
        dispatch(getPlaylistsByUser(userId));
      }, 3000);
    }
  }, [dispatch]);

  const [totalPlaylists, setAllPlaylists] = useState([]);

  useEffect(() => {
    setAllPlaylists(myPlaylists);
  }, [myPlaylists]);

  return (
    <>
      <div className="dashboard__background">
        <Navbar page="Playlists" />
        <CreatedPlaylists totalPlaylists={totalPlaylists} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allPlaylists: state.playlist.allPlaylists.data,
    myPlaylists: state.playlist.myPlaylists.data,
    // myFollowingPlaylists: state.playlist.myFollowingPlaylists.data
  };
};

const reduxHoc = connect(mapStateToProps);

export default reduxHoc(PlaylistPage);
