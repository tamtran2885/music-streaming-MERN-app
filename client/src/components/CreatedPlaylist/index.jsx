import React from 'react';
import { Link } from 'react-router-dom';
import star from '../../assets/images/star.svg'

const CreatedPlaylist = ({playlist}) => {

    const {title, thumbnail, _id} = playlist;

  return (
    <>
      <Link className='playlist__absolute' to={`/playlist/${_id}`} style={{ background: `url(${thumbnail && thumbnail}) no-repeat center center`}}>
        <div className='playlist__follow'>
        <img src={star} alt="" />
        </div>
          <h3 className='playlist__tittle'>{title && title}</h3>
        <div>
        </div>
      </Link>
    </>
  )
}

export default CreatedPlaylist;