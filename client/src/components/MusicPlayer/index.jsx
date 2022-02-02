import React from 'react';
import { Link } from 'react-router-dom';

const MusicPlayer = () => {
  return (
    <>
      <div className='musicplayer__absolute'>
        <div className='musicplayer__icon'>
          <img src="Icon" alt="Icon" />
        </div>
        <div className='musicplayer__info'>
          <div className='like'>Like</div>
          <div className='musicplayer__info__song'>
            <p className='tittle'>Song tittle</p>
            <p className='artist'>Song Artist · Genre</p>
          </div>
          <div className='musicplayer__options'>Options</div>
        </div>
        <div className='musicplayer__player'>
          <button>Repeat</button>
          <button>Back</button>
          <button>Play/Pause</button>
          <button>Foward</button>
          <button>Aleatory</button>
        </div>
        <div className='musicplayer__foward'></div>
        <div className='musicplayer__volume'></div>
      </div>
    </>
  )
}

export default MusicPlayer;