import React from 'react';
import { Link } from 'react-router-dom';
import albumicon from '../../assets/images/album.svg'

const Album = (album) => {

  const {title, artist} = album.album;
  return (
    <>
    <div className='album__absolute'>
      <Link className='link' to={`/user/album`}>
        <div className='album__block'>
          <div className='album__icon'>
            <img src={albumicon} alt="" />
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