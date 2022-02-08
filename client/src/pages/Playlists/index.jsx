import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Playlists from '../../components/Playlists';
import MusicPlayer from '../../components/MusicPlayer';

import withLayout from "../../hoc/withLayout";

import { useAuth } from "../../context/authContext";
import axios from 'axios';

const Dashboard = () => {
    const { user } = useAuth();
    const [mongoUser, setMongoUser] = useState({});

    // console.log(user.uid);

    useEffect(() => {
      if (user.accessToken) {
        APIcall();
      }
    });

    const APIcall = async () => {
        const userReq = await axios.get(`/api/user/${user.uid}`);
        setMongoUser(userReq.data);
    };



  return (
    <>
      <div className='dashboard__background'>
          <Navbar />
        <div className='dashboard__absolute'>
          <div className='dashboard__display'>
            <Playlists />
            <Playlists />
          </div>
        </div>
          <MusicPlayer />
      </div>
    </>
  )
}

export default withLayout(Playlists);

