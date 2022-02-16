import { fetchTracks, fetchSingleTrack } from "../../services/fetchData.js";
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

export const getSingleTrack = (_id) => {
  return async (dispatch) => {
    try {
      const response = await fetchSingleTrack(_id);
      // dispatch(setTracks(response));
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setTracks = (track) => ({
  type: SET_TRACKS_ARRAY,
  payload: track,
});

export const setCurrentTrack = (track) => ({
  type: SET_CURRENT_TRACK,
  payload: track,
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
