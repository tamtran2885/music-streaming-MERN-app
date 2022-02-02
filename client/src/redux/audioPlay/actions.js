import { fetchTracks } from "../../services/fetchData.js";
import {
  SET_TRACKS_ARRAY,
  SET_CURRENT_TRACK,
  SET_PLAYING,
  SET_REPEAT,
  SET_RANDOM,
} from "./types";

export const getTracks = () => {
  return async (dispatch) => {
    try {
      const response = await fetchTracks();
      dispatch(setTracks(response));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setTracks = (response) => ({
  type: SET_TRACKS_ARRAY,
  payload: response,
});

export const setCurrentTrack = (id) => ({
  type: SET_CURRENT_TRACK,
  payload: id,
});

export const setPlaying = (playing) => ({
  type: SET_PLAYING,
  payload: playing ? false : true,
});

export const setRepeat = (repeat) => ({
  type: SET_REPEAT,
  payload: repeat ? false : true,
});

export const setRandom = (random) => ({
  type: SET_RANDOM,
  payload: random ? false : true,
});
