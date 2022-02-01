import React from 'react';

const Song = () => {
  return (
    <>
    <div className='song__absolute'>
      <div className='song__number'>
        1
      </div>
      <div className='song__image'>
        <img src="" alt="" />
      </div>
      <div className='song__like'>
        Like
      </div>
      <div className='song__info'>
        <p className='song__tittle'>Song Tittle</p>
        <p className='song__artist'>Artist · Genre</p>
      </div>
      <div className='song__duration'>0:00</div>
    </div>
    </>
  )
}

export default Song;