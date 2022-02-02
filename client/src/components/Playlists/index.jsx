import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Playlist from '../Playlist';

import {connect, useDispatch} from "react-redux";
import {getPlaylists} from "../../redux/dashboard/actions";

const Playlists = ({playlists}) => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getPlaylists());
  }, [dispatch])

  const playlistsInfo = playlists.data;

  return (
    <>
      <div className='playlists__absolute'>
        <div className='playlists__tittle'>
          <h2>Playlists</h2>
          <Link to={`/user/playlists`}>See All</Link>
        </div>
        <div className='playlists__container'>
          {playlistsInfo && playlistsInfo.map((playlist) => (
            <div key={playlist.id}><Playlist key={playlist.id} playlist={playlist}/></div>
          ))}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    playlists: state.dashboard.playlists
  }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Playlists);