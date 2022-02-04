import React from 'react';
import {useDispatch} from "react-redux";
import { setCurrentTrack } from "../../redux/audioPlay/actions";
import star from '../../assets/images/star.svg'

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
      <div className='song__image__container'>
        <button className='song__button' onClick={handleClick}><img className='song__image' src={thumbnail} alt="song" style={{ width: '50px', height: '50px'}}/></button>
      </div>
      <div className='song__like'>
        <form>
          <label>
            <input className='checkbox' type="checkbox" name="like" />
          </label>
        </form>
      </div>
      <img className='song__like__icon' src={star} alt="" />
      <div className='song__info'>
        <p className='song__tittle'>{name}</p>
        <p className='song__artist'>Artist · Genre</p>
      </div>
      <div className='song__duration'>{duration}:49</div>
    </div>
    </>
  )
}

export default Song;