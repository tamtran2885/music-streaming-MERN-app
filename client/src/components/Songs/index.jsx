import React from 'react';
import { Link } from 'react-router-dom';
import Song from '../Song'

const Songs = () => {
  return (
    <>
    <div className='songs__absolute'>
      <div className='songs__tittle'>
        <h2>Songs</h2>
        <Link to={`/user/songs`}>See All</Link>
      </div>
      <div className='songs__container'>
        <Song />
      </div>
    </div>
    </>
  )
}

export default Songs;