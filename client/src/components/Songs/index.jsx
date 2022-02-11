import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Song from '../Song'
// import SkeletonElements from "../../skeletons/SkeletonElements";

const Songs = ({ tracksDashboard }) => {
  // console.log(tracksDashboard);
  const [tracks, setTracks] = useState([]);

  const token = localStorage.getItem("token")
  // console.log(token)

  useEffect(() => {
    if (token) {
      setTracks(tracksDashboard)
    }
  }, [tracksDashboard, setTracks])

  return (
    <>
      <div className='songs__absolute'>
        <div className='songs__tittle'>
          <h2>Songs</h2>
          <Link className='link' to={`/user/songs`}>See All</Link>
        </div>
        <div className='songs__container'>
          {/* <SkeletonElements type="title" />
          <SkeletonElements type="text" />
          <SkeletonElements type="thumbnail" />
          <SkeletonElements type="avatar" /> */}

          {tracks && tracks.map((track) => (
            <div><Song key={track._id} track={track} /></div>
          ))}
          {!tracks && <div>Loading...</div>}
        </div>
      </div>
    </>
  )
}

export default Songs;