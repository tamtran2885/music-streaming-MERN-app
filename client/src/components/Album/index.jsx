import React from 'react';
import { Link } from 'react-router-dom';

const Album = () => {
  return (
    <>
    <div className='album__absolute'>
      <Link to={`/user/album`}>
        <div className='album__block'>
          <div className='album__icon'>
            <img src="" alt="" />
          </div>
          <div className='album__info'>
            <p className='album__tittle'>Album Tittle</p>
            <p className='album__artist'>Album Artist</p>
          </div>
        </div>
      </Link>
    </div>
    </>
  )
}

export default Album;