import React, { useRef, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack, setPlaying, setRepeat, setRandom } from "../../redux/audioPlay/actions";
import cover from "../../assets/images/cover.jpg";
import star from '../../assets/images/star.svg';
import staractive from '../../assets/images/staractive.svg';
import menu from '../../assets/images/menu.svg'
import play from '../../assets/images/playbutton.svg'
import pause from '../../assets/images/pausebutton.svg'
import previous from '../../assets/images/previousbutton.svg'
import next from '../../assets/images/nextbutton.svg'
import repeatbutton from '../../assets/images/repeatbutton.svg'
import randombutton from '../../assets/images/randombutton.svg'
import playerdisc from '../../assets/images/playerdisc.svg'
import volume from '../../assets/images/volume.svg';

import { useAuth } from "../../context/authContext";
import { addLike, removeLike } from "../../redux/track/actions";

const MusicPlayer = () => {
  const userId = sessionStorage.getItem("userId");
  const dispatch = useDispatch();
  const { user } = useAuth();

  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);
  const trackList = useSelector((state) => state.audioPlayer.trackList);
  const playing = useSelector((state) => state.audioPlayer.playing);
  const repeat = useSelector((state) => state.audioPlayer.repeat);
  const random = useSelector((state) => state.audioPlayer.random);

  // self State
  const [stateVolume, setStateVolume] = useState(0.3);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0)

  // console.log(currentTrack)

  const audio = useRef("audio_tag")
  let likes = "";
  let trackId = ""
  if (currentTrack) {
    likes = currentTrack.likes;
    trackId = currentTrack._id
  }

  // console.log(likes)
  const uid = userId;
  const checkLike = (uid) => {
    if (likes && likes.filter(like => like.firebaseUser === uid).length === 0) {
      return false
    } else {
      return true
    }
  }

  // set state of like
  const like = checkLike(uid);
  const handleToggle = () => {
    if (like) {
      dispatch(removeLike(trackId, uid));
    } else {
      dispatch(addLike(trackId, uid));
    }
  }

  // Set state of track
  const handleTrack = () => {
    dispatch(setPlaying(playing));
  }

  // Control volume
  const onChangeVoLume = (q) => {
    setStateVolume(q);
    audio.current.volume = q;
  }

  const handleAudio = () => {
    audio.current.paused ? audio.current.play() : audio.current.pause();
  }

  // Calculate duration and progress of track
  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s
  }

  const handleProgress = (e) => {
    const compute = (e.target.value * duration) / 100
    setCurrentTime(compute)
    audio.current.currentTime = compute
  }

  // Move to previous track
  const getPrevTrack = () => {
    if (currentTrack && trackList && trackList.indexOf(currentTrack) === 1) {
      dispatch(setCurrentTrack(trackList[trackList.length - 1]));
    } else {
      dispatch(setCurrentTrack(trackList[trackList.indexOf(currentTrack) - 1]))
    }
  }

  // Move to next track
  const getNextTrack = () => {
    if (currentTrack && trackList && trackList.indexOf(currentTrack) === trackList.length - 1) {
      dispatch(setCurrentTrack(trackList[0]));
    } else {
      dispatch(setCurrentTrack(trackList[trackList.indexOf(currentTrack) + 1]))
    }
  }

  // Get random track
  const getRandomTrack = () => {
    dispatch(setCurrentTrack(trackList[~~(Math.random() * trackList.length)]))
    dispatch(setRandom(random));
  }

  // Repeat track
  const getRepeatTrack = () => {
    dispatch(setRepeat(repeat));
    if (repeat) {
      dispatch(setCurrentTrack(currentTrack));
    } else if (currentTrack && currentTrack === trackList.data.length - 1) {
      return;
    } else {
      dispatch(setCurrentTrack(currentTrack));
    }
  }

  return (
    <>
      <div className='difuse__background'></div>
      <div className='musicplayer__absolute'>
        <div className='musicplayer__icon'>
          <img className='icon' src={cover} alt="Icon" />
        </div>
        <div className='like'>
          {like === false ? (
            <img className='song__like__icon' src={star} alt="" onClick={handleToggle} />
          ) : (
            <img className='song__like__icon' src={staractive} alt="" onClick={handleToggle} />
          )
          }
        </div>
        <div className='musicplayer__info'>
          <div className='musicplayer__info__song'>
            <p className='tittle'>{currentTrack && currentTrack.title}</p>
            <p className='artist'>{currentTrack && currentTrack.album}· Genre</p>
          </div>
        </div>
        <div className='musicplayer__options'>
          <img className='song__options__icon' src={menu} alt="" />
          <div className="float__menu">
            <button className="nav__link">Add to playlist</button>
            <button className="nav__link">View the album</button>
          </div>
        </div>


        <div className='musicplayer__player'>
          <audio
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onCanPlay={(e) => setDuration(e.target.duration)}
            ref={audio}
            type="audio/mpeg"
            preload="true"
            src={currentTrack && currentTrack.urlTrack}
          />
          <button className='button' onClick={getRepeatTrack}>
            <img className='icon' src={repeatbutton} alt="Repeat" />
          </button>
          <button className='button' onClick={getPrevTrack}>
            <img className='icon' src={previous} alt="Previous" />
          </button>
          <button className='button' onClick={() => {
            handleTrack()
            handleAudio()
          }}>
            <img className='icon pause' src={pause} alt="Pause" />
          </button>
          <button className='button' onClick={getNextTrack}>
            <img className='icon' src={next} alt="Next" />
          </button>
          <button className='button' onClick={getRandomTrack}>
            <img className='icon' src={randombutton} alt="Random" />
          </button>
        </div>
        <img className='icon__disc' src={playerdisc} alt="Disc" />
        <div className='musicplayer__duration'>
          <div className='currentTime'>
            {fmtMSS(currentTime)}
          </div>
          <div className='input'>
            <input
              onChange={handleProgress}
              value={duration ? (currentTime * 100) / duration : 0}
              type="range"
            />
          </div>
          <div className='duration'>
            {fmtMSS(duration - currentTime)}
          </div>
        </div>

        <div className='musicplayer__volume'>
          <div className='musicplayer__volume__icon'>
            <img className='icon' src={volume} alt="Random" />
          </div>
          <div className='input'>
            <input
              value={Math.round(stateVolume * 100)}
              type="range"
              onChange={(e) => onChangeVoLume(e.target.value / 100)}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default MusicPlayer;