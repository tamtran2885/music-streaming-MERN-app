import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Song from '../Song'
// import SkeletonElements from "../../skeletons/SkeletonElements";

const Songs = ({tracksDashboard}) => {
  // console.log(tracksDashboard);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks(tracksDashboard)
  }, [tracksDashboard, setTracks])

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
          {!tracks && <div className='skeleton__track'>
            <div className='skeleton__track__single'></div>
            <div className='skeleton__track__single'></div>
            <div className='skeleton__track__single'></div>
            <div className='skeleton__track__single'></div>
            <div className='skeleton__track__single'></div>
            <div className='skeleton__track__single'></div>
            </div>}
        </div>
      </div>
    </>
  )
}

export default Songs;