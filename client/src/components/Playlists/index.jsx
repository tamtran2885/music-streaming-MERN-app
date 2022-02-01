import React from 'react';
import { Link } from 'react-router-dom';
import Playlist from '../Playlist';

const Playlists = () => {
  return (
    <>
      <div className='playlists__absolute'>
        <div className='playlists__tittle'>
          <h2>Playlists</h2>
          <Link to={`/user/playlists`}>See All</Link>
        </div>
        <div className='playlists__container'>
          <Playlist />
        </div>
      </div>
    </>
  )
}

export default Playlists;