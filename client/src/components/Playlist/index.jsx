import React from 'react';
import { Link } from 'react-router-dom';

const Playlist = (playlist) => {

  return (
    <>
      <div className='playlist__absolute'>
        <Link to={`/user/playlist`}>
        <div className='playlist__tittle'>
          {playlist.playlist && (
            <>
              <h3>{playlist.playlist.name}</h3>
              <img src={playlist.playlist.thumbnail} alt="playlist" style={{ width:"150px", height:"120px"}}/>
            </>
          )}
        </div>
        <div className='playlist__follow'>
          Follow
        </div>
        </Link>
      </div>
    </>
  )
}

export default Playlist;