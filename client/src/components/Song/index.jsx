import React from 'react';

const Song = (track) => {
  const { name, thumbnail, duration} = track.track
  return (
    <>
    <div className='song__absolute'>
      <div className='song__number'>
        1
      </div>
      <div className='song__image'>
        <img src={thumbnail} alt="song" style={{ width: '50px', height: '50px'}}/>
      </div>
      <div className='song__like'>
        Like
      </div>
      <div className='song__info'>
        <p className='song__tittle'>{name}</p>
        <p className='song__artist'>Artist · Genre</p>
      </div>
      <div className='song__duration'>{duration}</div>
    </div>
    </>
  )
}

export default Song;