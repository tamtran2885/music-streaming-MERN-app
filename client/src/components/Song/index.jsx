import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setTracks, setCurrentTrack, getSingleTrack } from "../../redux/audioPlay/actions";
import { addLike, removeLike } from "../../redux/track/actions";
import star from '../../assets/images/star.svg'
import staractive from '../../assets/images/staractive.svg';
import { useAuth } from "../../context/authContext";

const Song = (track) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const { user } = useAuth();
  const uid = userId;

  const { title, album, duration, genre, artist, _id, likes, photoTrack } = track.track

  const checkLike = (uid) => {
    if (likes.filter(like => like.firebaseUser === uid).length === 0) {
      return false
    } else {
      return true
    }
  }

  const [like, setLike] = useState(checkLike(uid))

  const handleClick = () => {
    // console.log("handleClick");
    dispatch(setCurrentTrack(track))
    dispatch(getSingleTrack(_id))
    dispatch(setTracks(track))
  }

  const handleToggle = () => {
    if (like) {
      dispatch(removeLike(_id, uid));
      setLike(!like);
    } else {
      dispatch(addLike(_id, uid));
      setLike(!like);
    }
  }
  const trackPhotoDefault = "data:image/jpeg;base64,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"

  return (
    <>
      <div className='song__absolute'>
        <div className='song__number'>
          1
        </div>
        <div className='song__image__container'>
          <button className='song__button' onClick={handleClick}><img className='song__image' src={photoTrack ? photoTrack : trackPhotoDefault} alt="song-thumb" /></button>
        </div>
        <div className='song__like'>
          {like === false ? (
            <img className='song__like__icon' src={star} alt="" onClick={handleToggle} />
          ) : (
            <img className='song__like__icon' src={staractive} alt="" onClick={handleToggle} />
          )
          }
        </div>
        <div className='song__info'>
          <p className='song__tittle'>{title && title} · {album && album}</p>
          <p className='song__artist'>{artist && artist} · {genre && genre}</p>
        </div>
        <div className='song__duration'>{duration && duration}</div>
      </div>
    </>
  )
}

export default Song;