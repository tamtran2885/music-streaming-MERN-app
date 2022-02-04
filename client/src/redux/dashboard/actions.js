import {
  fetchTracks,
  fetchPlaylists,
  fetchAlbums,
} from "../../services/fetchData.js";

import { SET_TRACKS_INFO, SET_PLAYLISTS_INFO, SET_ALBUMS_INFO } from "./types";

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
