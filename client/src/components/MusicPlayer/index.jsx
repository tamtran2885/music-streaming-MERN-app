import React, { useRef, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack, setPlaying, setRepeat, setRandom } from "../../redux/audioPlay/actions";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);
  const trackList = useSelector((state) => state.audioPlayer.trackList);
  const playing = useSelector((state) => state.audioPlayer.playing);
  const repeat = useSelector((state) => state.audioPlayer.repeat);
  const random = useSelector((state) => state.audioPlayer.random);

  // self State
  const [stateVolume, setStateVolume] = useState(0.3);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0)

  const audio = useRef("audio_tag")

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
    const compute = (e.target.value * duration)/100
    setCurrentTime(compute)
    audio.current.currentTime = compute
  }

  // Move to previous track
  const getPrevTrack = () => {
    if (currentTrack && trackList && trackList.indexOf(currentTrack) === 1) {
      dispatch(setCurrentTrack(trackList[trackList.length-1]));
    } else {
      dispatch(setCurrentTrack(trackList[trackList.indexOf(currentTrack)-1]))
    }
  }

  // Move to next track
  const getNextTrack = () => {
    if (currentTrack && trackList && trackList.indexOf(currentTrack) === trackList.length-1) {
      dispatch(setCurrentTrack(trackList[0]));
    } else {
      dispatch(setCurrentTrack(trackList[trackList.indexOf(currentTrack)+1]))
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
    } else if (currentTrack && currentTrack === trackList.data.length-1) {
      return;
    } else {
      dispatch(setCurrentTrack(currentTrack));
    }
  }

  return (
    <>
      <div className='musicplayer__absolute'>
        <div className='musicplayer__icon'>
          <img src="Icon" alt="Icon" />
        </div>
        <div className='musicplayer__info'>
          <div className='like'>Like</div>
          <div className='musicplayer__info__song'>
            <p className='tittle'>{currentTrack && currentTrack.track.name}</p>
            <p className='artist'>{currentTrack && currentTrack.track.artist}· Genre</p>
          </div>
          <div className='musicplayer__options'>Options</div>
        </div>
        <div className='musicplayer__player'>
          <audio
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onCanPlay={(e) => setDuration(e.target.duration)}
            ref={audio}
            type="audio/mpeg"
            preload="true"
            src={currentTrack && currentTrack.track.url}
          />
          <div>
            <label>Volume: </label>
            <input
              value={Math.round(stateVolume * 100)}
              type="range"
              onChange={(e) => onChangeVoLume(e.target.value/100)}
            />
          </div>
          <div>
            <label>Song Progress: </label>
            <input
              onChange={handleProgress}
              value={duration ? (currentTime * 100) / duration : 0}
              type="range"
            />
            <span>{fmtMSS(currentTime)}/{fmtMSS(duration)}</span>
          </div>
          <button onClick={getRepeatTrack}>Repeat</button>
          <button onClick={getPrevTrack}>Previous</button>
          <button onClick={() => {
            handleTrack()
            handleAudio()
          }}>Play/Pause</button>
          <button onClick={getNextTrack}>Next</button>
          {/* <button>Forward</button> */}
          <button onClick={getRandomTrack}>Aleatory</button>
        </div>
        <div className='musicplayer__foward'></div>
        <div className='musicplayer__volume'></div>
      </div>
    </>
  )
}

export default MusicPlayer;