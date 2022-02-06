import React from 'react';
import { useDispatch } from "react-redux";
import { setTracks, setCurrentTrack, getSingleTrack } from "../../redux/audioPlay/actions";
import star from '../../assets/images/star.svg'

const Song = (track) => {
  const dispatch = useDispatch();

  const { title, album, duration, user, genre, _id } = track.track

  const handleClick = () => {
    // console.log("handleClick");
    dispatch(setCurrentTrack(track))
    dispatch(getSingleTrack(_id))
    dispatch(setTracks(track))
  }

  const handleLike = () => {
    console.log("like this song");
  }

  return (
    <>
      <div className='song__absolute'>
        <div className='song__number'>
          {/* {track.track.indexOf()} */}
        </div>
        <div className='song__image__container'>
          <button className='song__button' onClick={handleClick}><img className='song__image' src="https://images.pexels.com/photos/1114896/pexels-photo-1114896.jpeg" alt="song-thumb" style={{ width: '50px', height: '50px' }} /></button>
        </div>
        <div className='song__like'>
        </div>
        <input type="checkbox" />
        <img className='song__like__icon' src={star} alt="" onClick={handleLike}/>
        <div className='song__info'>
          <p className='song__tittle'>{title && title} </p>
          <p className='song__artist'>{user && user.firstName} · {genre && genre}</p>
          <p className='song__tittle'>{album && album}</p>
        </div>
        <div className='song__duration'>{duration && duration}</div>
      </div>
    </>
  )
}

export default Song;