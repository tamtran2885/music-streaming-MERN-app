import React from 'react';
import { useDispatch } from "react-redux";
import { setTracks, setCurrentTrack, getSingleTrack } from "../../redux/audioPlay/actions";
import star from '../../assets/images/star.svg'

const Song = (track) => {
  const dispatch = useDispatch();

  const { title, album, duration, user, genre, id } = track.track

  const handleClick = () => {
    // console.log("handleClick");
    dispatch(setCurrentTrack(track))
    dispatch(getSingleTrack(id))
    dispatch(setTracks(track))
  }

  // const toggleFavAction = () => {
  //   console.log("toggleFavAction")
  // }

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
          <form>
            {/* <label> Like/Unlike
              <input type="button" name="like" onClick={() => toggleFavAction(track)} />
            </label> */}
            <label>
              <input className='checkbox' type="checkbox" name="like" />
            </label>
          </form>
        </div>
        <img className='song__like__icon' src={star} alt="" />
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