import React from 'react';
import { Link } from 'react-router-dom';
import star from '../../assets/images/star.svg'

const Playlist = (playlist) => {
  const {title, thumbnail} = playlist.playlist;

  return (
    <>
      <div className='playlist__absolute'>
        <Link className='playlist__absolute' to={`/user/playlist`}>
        <div>
          {playlist.playlist && (
            <>
              <h3 className='playlist__tittle'>{title && title}</h3>
                <img className='playlist__background' src={thumbnail && thumbnail} alt="playlist"/>
            </>
          )}
        </div>
        <div className='playlist__follow'>
        <img src={star} alt="" />
        </div>
        </Link>
      </div>
    </>
  )
}

export default Playlist;