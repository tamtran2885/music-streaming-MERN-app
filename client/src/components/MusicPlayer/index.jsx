import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getTracks, setCurrentTrack, setPlaying, setRepeat, setRandom } from "../../redux/audioPlay/actions";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);
  const trackList = useSelector((state) => state.audioPlayer.trackList);
  const playing = useSelector((state) => state.audioPlayer.playing);
  const repeat = useSelector((state) => state.audioPlayer.repeat);
  const random = useSelector((state) => state.audioPlayer.random);

  useEffect(() => {
    dispatch(getTracks());
  }, [dispatch])

  // self State
  const [stateVolume, setStateVolume] = useState(0.3);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0)

  const audio = useRef("audio_tag")

  const onChangeVoLume = (q) => {
    setStateVolume(q);
    audio.current.volume = q;
  }

  const handleProgress = (e) => {
    const compute = (e.target.value * duration)/100
    setCurrentTime(compute)
    audio.current.currentTime = compute
  }

  const handleAudio = () => {
    audio.current.paused ? audio.current.play() : audio.current.pause();
  }

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }

  const getPrevTrack = () => {
    dispatch(setCurrentTrack(currentTrack-1))
    // if (currentTrack === 1) {
    //   dispatch(setCurrentTrack(trackList.trackList.length - 1));
    // } else {
    //   dispatch(setCurrentTrack(currentTrack-1))
    // }
  }

  const handleTrack = () => {
    dispatch(setPlaying(playing));
  }

  const getNextTrack = () => {
    dispatch(setCurrentTrack(currentTrack+1))
    // if (currentTrack === trackList.trackList.length) {
    //   dispatch(setCurrentTrack(1));
    // } else {
    //   dispatch(setCurrentTrack(currentTrack+1))
    // }
  }

  const getRandomTrack = () => {
    // console.log('getRandomTrack');
    dispatch(setCurrentTrack(~~(Math.random() * trackList.data.length)))
    dispatch(setRandom(random));
  }

  const getRepeatTrack = () => {
    console.log('getRepeatTrack')
    dispatch(setRepeat(repeat));
  }
  


// const setEndTrack = () => {
//     if (initialState.random) {
//       return (dispatch) => ({
//         type: SET_CURRENT_TRACK,
//         payload: ~~(Math.random() * initialState.songs.length),
//       });
//     } else {
//       if (initialState.repeat) {
//         setNextTrack();
//       } else if (
//         initialState.currentTrack ===
//         initialState.trackList.length - 1
//       ) {
//         return;
//       } else {
//         setNextTrack();
//       }
//     }
//   };

  return (
    <>
      <div className='musicplayer__absolute'>
        <div className='musicplayer__icon'>
          <img src="Icon" alt="Icon" />
        </div>
        <div className='musicplayer__info'>
          <div className='like'>Like</div>
          <div className='musicplayer__info__song'>
            <p className='tittle'>{trackList && currentTrack && trackList.data[currentTrack].name}</p>
            <p className='artist'>{trackList && currentTrack && trackList.data[currentTrack].artist}· Genre</p>
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
            src={trackList && currentTrack && trackList.data[currentTrack].url}
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
            <span>{fmtMSS(currentTime)}</span>/
            <span>{fmtMSS(duration)}</span>
          </div>
          <button onClick={getRepeatTrack}>Repeat</button>
          <button onClick={getPrevTrack}>Previous</button>
          <button onClick={() => {
            handleTrack()
            handleAudio()
          }}>Play/Pause</button>
          <button onClick={getNextTrack}>Next</button>
          <button>Forward</button>
          <button onClick={getRandomTrack}>Aleatory</button>
        </div>
        <div className='musicplayer__foward'></div>
        <div className='musicplayer__volume'></div>
      </div>
    </>
  )
}

export default MusicPlayer;