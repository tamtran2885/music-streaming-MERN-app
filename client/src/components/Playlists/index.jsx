import React from 'react';
import { Link } from 'react-router-dom';
import Playlist from '../Playlist';

const Playlists = ({playlistsDashboard}) => {

  return (
    <>
      <div className='playlists__absolute'>
        <div className='playlists__tittle'>
          <h2>Playlists</h2>
          <Link className='link' to={`/user/playlists`}>See All</Link>
        </div>
        <div className='playlists__container'>
          {playlistsDashboard && playlistsDashboard.map((playlist) => (
            <div className='playlist__container' key={playlist.id}><Playlist key={playlist.id} playlist={playlist}/></div>
          ))}
        </div>
      </div>
    </>
  )
}


export default Playlists;