import {
  fetchTracks,
  fetchPlaylists,
  fetchAlbums,
  fetchTracksByUser,
} from "../../services/fetchData.js";

import {
  SET_TRACKS_INFO,
  SET_PLAYLISTS_INFO,
  SET_ALBUMS_INFO,
  SET_TRACKS_BY_USER,
} from "./types";

// Get all tracks, albums, playlists
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

export const getPlaylists = () => {
  return async (dispatch) => {
    try {
      const response = await fetchPlaylists();
      dispatch(setPlaylists(response));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAlbums = () => {
  return async (dispatch) => {
    try {
      const response = await fetchAlbums();
      dispatch(setAlbums(response));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setTracks = (response) => ({
  type: SET_TRACKS_INFO,
  payload: response,
});

export const setPlaylists = (response) => ({
  type: SET_PLAYLISTS_INFO,
  payload: response,
});

export const setAlbums = (response) => ({
  type: SET_ALBUMS_INFO,
  payload: response,
});

// Get tracks, albums, playlist by user
export const getTracksByUser = (useFbId) => {
  return async (dispatch) => {
    try {
      const response = await fetchTracksByUser(useFbId);
      dispatch(setTracksByUser(response));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setTracksByUser = (response) => ({
  type: SET_TRACKS_BY_USER,
  payload: response,
});
