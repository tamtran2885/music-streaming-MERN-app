import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Playlist from '../Playlist';

const Playlists = ({ playlistsDashboard }) => {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    setPlaylists(playlistsDashboard)
  }, [playlistsDashboard, setPlaylists])

  return (
    <>
      <div className='playlists__absolute'>
        <div className='playlists__tittle'>
          <h2>Playlists</h2>
          <Link className='link' to={`/playlist`}>See All</Link>
        </div>
          {!playlists && <div className='skeleton__playlist'>
            <div className='skeleton__playlist__single'></div>
            <div className='skeleton__playlist__single'></div>
            <div className='skeleton__playlist__single'></div>
            <div className='skeleton__playlist__single'></div>
            </div>}
        <div className='playlists__container'>
          {playlists && playlists.map((playlist) => (
            <div className='playlist__container' key={playlist._id}><Playlist key={playlist._id} playlist={playlist}/></div>
          ))}
        </div>
      </div>
    </>
  )
}


export default Playlists;