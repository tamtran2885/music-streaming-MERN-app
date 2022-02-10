import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Song from '../Song'

const Songs = ({tracksDashboard, num}) => {
  // console.log(tracksDashboard);
  const [tracks, setTracks] = useState([]);
  const [state, setState] = useState()

  useEffect(() => {
    setTracks(tracksDashboard)
    setState(num)
  }, [tracksDashboard, setTracks, num])

  return (
    <>
      <div className='songs__absolute'>
        <div className='songs__tittle'>
          <h2>Songs</h2>
          <h2>{state}</h2>
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