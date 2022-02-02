import React from 'react';
import { Link } from 'react-router-dom';

const Album = (album) => {

  const {title, thumbnail, artist} = album.album;
  return (
    <>
    <div className='album__absolute'>
      <Link to={`/user/album`}>
        <div className='album__block'>
          <div className='album__icon'>
            <img src={thumbnail} alt="album" style={{ width: '50px', height: '50px'}}/>
          </div>
          <div className='album__info'>
            <p className='album__tittle'>{title}</p>
            <p className='album__artist'>{artist}</p>
          </div>
        </div>
      </Link>
    </div>
    </>
  )
}

export default Album;