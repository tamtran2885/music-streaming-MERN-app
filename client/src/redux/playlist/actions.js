import {
  fetchPlaylists,
  fetchPlayListsByUser,
} from "../../services/fetchData.js";

import { SET_ALL_PLAYLISTS, SET_PLAYLISTS_BY_USER } from "./types";

// Get all playlists
export const getAllPlaylists = () => {
  return async (dispatch) => {
    try {
      const response = await fetchPlaylists();
      dispatch(setAllPlaylists(response));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setAllPlaylists = (response) => ({
  type: SET_ALL_PLAYLISTS,
  payload: response,
});

// Get playlists by user
export const getPlaylistsByUser = (useFbId) => {
  return async (dispatch) => {
    try {
      const response = await fetchPlayListsByUser(useFbId);
      dispatch(setPlaylistsByUser(response));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setPlaylistsByUser = (response) => ({
  type: SET_PLAYLISTS_BY_USER,
  payload: response,
});
