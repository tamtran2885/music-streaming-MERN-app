import { fetchTracks, fetchTracksByUser } from "../../services/fetchData.js";
import axios from "axios";

import {
  SET_ALL_TRACKS,
  UPDATE_LIKES,
  DELETE_TRACK,
  SET_TRACKS_BY_USER,
} from "./types";

// Get data
export const getAllTracks = () => {
  return async (dispatch) => {
    try {
      const response = await fetchTracks();
      dispatch(setAllTracks(response));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setAllTracks = (response) => ({
  type: SET_ALL_TRACKS,
  payload: response,
});

// Get tracks by user
export const getTracksByUser = (useFbId) => {
  return async (dispatch) => {
    try {
      const response = await fetchTracksByUser(useFbId);
      dispatch(setTracksByUser(response));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setTracksByUser = (response) => ({
  type: SET_TRACKS_BY_USER,
  payload: response,
});

// Add like or remove like from a song
export const addLike = (trackId, firebaseUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/tracks/like/${trackId}?firebaseUser=${firebaseUser}`
      );
      dispatch(updateLikes(response));
      dispatch(getAllTracks());
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeLike = (trackId, firebaseUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/tracks/unlike/${trackId}?firebaseUser=${firebaseUser}`
      );
      dispatch(updateLikes(response));
      dispatch(getAllTracks());
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateLikes = (response) => ({
  type: UPDATE_LIKES,
  payload: { likes: response.data },
});

// Delete track
export const deleteSingleTrack = (trackId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/tracks/${trackId}`
      );
      dispatch(deleteTrack(trackId));
      console.log(trackId);
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteTrack = (trackId) => ({
  type: DELETE_TRACK,
  payload: trackId,
});
