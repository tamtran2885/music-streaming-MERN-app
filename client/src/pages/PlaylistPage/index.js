import React from "react";
// import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
// import MusicPlayer from "../../components/MusicPlayer";
import CreatedPlaylists from "../../components/CreatedPlaylists";

import { useAuth } from "../../context/authContext";
import { useSelector } from "react-redux";

const PlaylistPage = () => {
  const { user } = useAuth();
  const myPlaylists = useSelector((state) => state.playlist.myPlaylists.data);

  return (
    <>
      <div className="dashboard__background">
        <Navbar page="Playlists" />
        <h1>Welcome Guest!</h1>
        {/* <Link to="/playlist/add"> */}
        <button>Add New Playlist</button>
        <CreatedPlaylists myPlaylists={myPlaylists} />
        {/* </Link> */}
        {/* <div>Playlist</div> */}
      </div>
    </>
  );
};

export default PlaylistPage;
