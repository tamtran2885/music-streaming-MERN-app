import React from 'react';
import { Link } from 'react-router-dom';
import star from '../../assets/images/star.svg'

const Playlist = (playlist) => {
  const {title, thumbnail} = playlist.playlist;

  return (
    <>
      <div>
        <Link className='playlist__absolute' to={`/playlist/:playlistId`} style={{ background: `url(${thumbnail && thumbnail}) no-repeat center center`}}>
          <div className='playlist__follow'>
          <img src={star} alt="" />
          </div>
          <div>
            {playlist.playlist && (
              <>
                <h3 className='playlist__tittle'>{title && title}</h3>
                  {/*<img className='playlist__background' src={thumbnail && thumbnail} alt="playlist"/>*/}
              </>
            )}
          </div>
        </Link>
      </div>
    </>
  )
}

export default Playlist;