import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MusicPlayer from "../../components/MusicPlayer";

import { useAuth } from "../../context/authContext";

const PlaylistPage = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="dashboard__background">
        <Navbar page="Playlists" />
        <h1>Welcome Guest!</h1>
        <Link to="/playlist/add">
          <button>Add New Playlist</button>
        </Link>
        <div>Playlist</div>
        <MusicPlayer />
      </div>
    </>
  );
};

export default PlaylistPage;
