import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import CreatedPlaylists from "../../components/CreatedPlaylists";
import { connect, useDispatch } from "react-redux";
import {
  getAllPlaylists,
  getPlaylistsByUser,
  getFollowingPlaylistsByUser,
} from "../../redux/playlist/actions";

const PlaylistPage = ({ myPlaylists, myFollowingPlaylists }) => {
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
        dispatch(getFollowingPlaylistsByUser(userId));
      }, 1000);
    }
  }, [dispatch, loggedToken, navigate, userId]);

  const [totalMyPlaylists, setAllMyPlaylists] = useState([]);
  const [followingPlaylists, setFollowingPlaylists] = useState([]);

  useEffect(() => {
    setAllMyPlaylists(myPlaylists);
    setFollowingPlaylists(myFollowingPlaylists);
  }, [myPlaylists, myFollowingPlaylists]);

  // console.log(myFollowingPlaylists.result);

  return (
    <>
      <div className="dashboard__background">
        <Navbar page="Playlists" />
        <CreatedPlaylists
          totalMyPlaylists={totalMyPlaylists}
          followingPlaylists={followingPlaylists}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allPlaylists: state.playlist.allPlaylists,
    myPlaylists: state.playlist.myPlaylists,
    myFollowingPlaylists: state.playlist.myFollowingPlaylists,
  };
};

const reduxHoc = connect(mapStateToProps);

export default reduxHoc(PlaylistPage);
