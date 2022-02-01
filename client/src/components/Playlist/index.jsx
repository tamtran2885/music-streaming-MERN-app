import React from 'react';
import { Link } from 'react-router-dom';

const Playlist = () => {
  return (
    <>
      <div className='playlist__absolute'>
        <Link to={`/user/playlist`}>
        <div className='playlist__tittle'>
          <h3>Playlist Tittle</h3>
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