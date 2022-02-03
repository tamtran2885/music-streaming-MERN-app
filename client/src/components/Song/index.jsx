import React from 'react';
import {useDispatch} from "react-redux";
import { setCurrentTrack } from "../../redux/audioPlay/actions";

const Song = (track) => {
  const dispatch = useDispatch(); 

  const { name, thumbnail, duration, id} = track.track

  const handleClick = () => {
    // console.log("handleClick");
    dispatch(setCurrentTrack(id))
  }
  return (
    <>
    <div className='song__absolute'>
      <div className='song__number'>
        1
      </div>
      <div className='song__image'>
        <img src={thumbnail} alt="song" style={{ width: '50px', height: '50px'}}/>
        <button onClick={handleClick}>Play</button>
      </div>
      <div className='song__like'>
        <form>
          <label>Like/Unlike:
            <input type="checkbox" name="like" />
          </label>
        </form>
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