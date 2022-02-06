import React from 'react';
import { Link } from 'react-router-dom';
import Song from '../Song'

import { useSelector } from "react-redux";


const Songs = () => {
  const tracks = useSelector((state) => state.dashboard.tracks.data);
  // console.log(tracks)

  return (
    <>
      <div className='songs__absolute'>
        <div className='songs__tittle'>
          <h2>Songs</h2>
          <Link className='link' to={`/user/songs`}>See All</Link>
        </div>
        <div className='songs__container'>
          {tracks && tracks.map((track) => (
            <div><Song key={track._id} track={track} /></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Songs;