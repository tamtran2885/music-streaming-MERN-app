import React from 'react';
import Genre from '../Genre'

const Genres = () => {
  return (
    <>
    <div className='genres__absolute'>
      <div className='genres__tittle'>
        <h2>Genres</h2>
      </div>
      <div className='genres__container'>
        <Genre />
      </div>
    </div>
    </>
  )
}

export default Genres;