import React from 'react';
import { Link } from 'react-router-dom';
import Song from '../Song'

const Songs = ({tracksDashboard}) => {
  // console.log(tracksDashboard);
  return (
    <>
      <div className='songs__absolute'>
        <div className='songs__tittle'>
          <h2>Songs</h2>
          <Link className='link' to={`/user/songs`}>See All</Link>
        </div>
        <div className='songs__container'>
          {tracksDashboard && tracksDashboard.map((track) => (
            <div><Song key={track._id} track={track} /></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Songs;