import React from 'react';
import { Link } from 'react-router-dom';

const Genre = () => {
  return (
    <>
    <div className='genre__absolute'>
      <Link className='genre' to={`/user/genre`}>Genre</Link>
    </div>
    </>
  )
}

export default Genre;