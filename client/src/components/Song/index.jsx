import React from 'react';
import {useDispatch} from "react-redux";
import { setTracks, setCurrentTrack, getSingleTrack } from "../../redux/audioPlay/actions";
import star from '../../assets/images/star.svg'

const Song = (track) => {
  const dispatch = useDispatch();

  const { name, thumbnail, id} = track.track

  const handleClick = () => {
    // console.log("handleClick");
    dispatch(setCurrentTrack(track))
    dispatch(getSingleTrack(id))
    dispatch(setTracks(track))
  }

  const toggleFavAction = () => {
    console.log("toggleFavAction")
    // dispatch to add Fav
    // dispatch(setFavoriteTrack(track))
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
      </div>
      <img className='song__like__icon' src={star} alt="" onClick={() => toggleFavAction(track)} />
      <div className='song__info'>
        <p className='song__tittle'>{name}</p>
        {/* <p className='song__artist'>Artist · Genre</p> */}
      </div>
      {/* <div className='song__duration'>{duration}</div> */}
      <div className='song__duration'>49</div>
    </div>
    </>
  )
}

export default Song;