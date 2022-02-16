import { fetchTracks, fetchTracksByUser } from "../../services/fetchData.js";
import axios from "axios";

import {
  SET_ALL_TRACKS,
  UPDATE_LIKES,
  DELETE_TRACK,
  SET_TRACKS_BY_USER,
  SET_FAV_TRACKS_BY_USER,
} from "./types";
const token = sessionStorage.getItem("token");

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

// Get data
export const getAllTracks = () => {
  return async (dispatch) => {
    try {
      const response = await fetchTracks();
      dispatch(setAllTracks(response));
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setAllTracks = (response) => ({
  type: SET_ALL_TRACKS,
  payload: response.data,
});

// Get tracks by user
export const getTracksByUser = (useFbId) => {
  return async (dispatch) => {
    try {
      const response = await fetchTracksByUser(useFbId);
      dispatch(setTracksByUser(response));
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setTracksByUser = (response) => ({
  type: SET_TRACKS_BY_USER,
  payload: response.data,
});

// Add like or remove like from a song
export const addLike = (trackId, firebaseUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tracks/like/${trackId}?firebaseUser=${firebaseUser}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(updateLikes(response));
      dispatch(getAllTracks());
      dispatch(getTracksByUser(firebaseUser));
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeLike = (trackId, firebaseUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tracks/unlike/${trackId}?firebaseUser=${firebaseUser}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(updateLikes(response));
      dispatch(getAllTracks());
      dispatch(getTracksByUser(firebaseUser));
      dispatch(getFavTracksByUser(firebaseUser));
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
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/tracks/${trackId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
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

// Get fav tracks of a certain user
export const getFavTracksByUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/tracks/likedByUser/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      // console.log(response);
      dispatch(setFavTracksByUser(response.data.tracksInfo));
    } catch (err) {
      console.error(err);
    }
  };
};

export const setFavTracksByUser = (response) => ({
  type: SET_FAV_TRACKS_BY_USER,
  payload: response,
});

// Add reproduction counter to track
export const addReproductionsCounter = (trackId, userId) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tracks/reproducing/${trackId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(getAllTracks());
      dispatch(getTracksByUser(userId));
    } catch (err) {
      console.error(err);
    }
  };
};
