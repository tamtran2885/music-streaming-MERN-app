import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Song from '../Song';
import OrderNumber from '../OrderNumber';
// import SkeletonElements from "../../skeletons/SkeletonElements";

const Songs = ({ tracksDashboard }) => {
  const token = sessionStorage.getItem("token")

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks(tracksDashboard)
  }, [tracksDashboard, setTracks])

  const trackNumber = () => {
    if (tracks) {
      return tracks.length
    }
    return;
  }

  const sortTracks = () => {
    if (tracks) {
      return [...tracks].sort((a,b) => b.reproductions - a.reproductions)
    }
    return;
  }
  // console.log(sortTracks())

  return (
    <>
      <div className='songs__absolute'>
        <div className='songs__tittle'>
          <h2>Songs</h2>
          <Link className='link' to={`/user/songs`}>See All</Link>
        </div>
        <div className='songs__container'>
          <div className='position'>
            {[...Array(trackNumber())].map((e,i) => (
              <div key={i}><OrderNumber i={i} /></div>
            ))}
          </div>
          <div className='track'>
            {sortTracks() && sortTracks().map((track) => (
              <div key={track._id}><Song key={track._id} track={track} /></div>
            ))}
          </div>
            {!tracks && trackNumber &&
            <div className='skeleton__track'>
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