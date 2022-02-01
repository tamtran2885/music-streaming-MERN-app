import React from 'react';
import { Link } from 'react-router-dom';
import Album from '../Album';

const Albums = () => {
  return (
    <>
    <div className='albums__absolute'>
      <div className='albums__tittle'>
        <h2>Albums</h2>
        <Link to={`/user/albums`}>See All</Link>
      </div>
      <div className='albums__container'>
        <Album />
      </div>
    </div>
    </>
  )
}

export default Albums;