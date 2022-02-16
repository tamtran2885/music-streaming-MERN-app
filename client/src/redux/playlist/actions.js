import {
  fetchPlaylists,
  fetchPlayListsByUser,
  fetchPlaylistTracks,
  fetchFollowingPlaylistsByUser,
} from "../../services/fetchData.js";

import {
  SET_ALL_PLAYLISTS,
  SET_PLAYLISTS_BY_USER,
  SET_CURRENT_PLAYLIST,
  SET_CURRENT_PLAYLIST_INFO,
  SET_FOLLOWING_PLAYLISTS_BY_USER,
} from "./types";
import axios from "axios";
const token = sessionStorage.getItem("token");

// Get all playlists
export const getAllPlaylists = () => {
  return async (dispatch) => {
    try {
      const response = await fetchPlaylists();
      dispatch(setAllPlaylists(response));
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setAllPlaylists = (response) => ({
  type: SET_ALL_PLAYLISTS,
  payload: response.data,
});

// Get playlists by user
export const getPlaylistsByUser = (useFbId) => {
  return async (dispatch) => {
    try {
      const response = await fetchPlayListsByUser(useFbId);
      dispatch(setPlaylistsByUser(response));
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setPlaylistsByUser = (response) => ({
  type: SET_PLAYLISTS_BY_USER,
  payload: response.data,
});

// Get Playlist Details (Tracks of Playlist)
export const getPlaylistDetails = (playlistId) => {
  return async (dispatch) => {
    try {
      const response = await fetchPlaylistTracks(playlistId);
      dispatch(setCurrentPlaylist(response));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setCurrentPlaylist = (response) => ({
  type: SET_CURRENT_PLAYLIST,
  payload: response.data,
});

// Get Current Playlist Info
export const getCurrentPlaylistInfo = (playlistId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/playlists/${playlistId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      dispatch(setCurrentPlaylistInfo(response));
    } catch (err) {
      console.error(err);
    }
  };
};

export const setCurrentPlaylistInfo = (response) => ({
  type: SET_CURRENT_PLAYLIST_INFO,
  payload: response.data,
});

// Add follow or remove follow from a playlist
export const followPlaylist = (playlistId, firebaseUser) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `http://localhost:4000/api/playlists/follow/${playlistId}?firebaseUser=${firebaseUser}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      // dispatch(updateLikes(response));
      dispatch(getAllPlaylists());
      dispatch(getPlaylistsByUser(firebaseUser));
    } catch (err) {
      console.error(err);
    }
  };
};

export const unfollowPlaylist = (playlistId, firebaseUser) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `http://localhost:4000/api/playlists/unfollow/${playlistId}?firebaseUser=${firebaseUser}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      // dispatch(updateLikes(response));
      dispatch(getAllPlaylists());
      dispatch(getPlaylistsByUser(firebaseUser));
    } catch (err) {
      console.error(err);
    }
  };
};

// Get all playlists a user is following
export const getFollowingPlaylistsByUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetchFollowingPlaylistsByUser(userId);
      dispatch(setFollowingPlaylistsByUser(response));
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setFollowingPlaylistsByUser = (response) => ({
  type: SET_FOLLOWING_PLAYLISTS_BY_USER,
  payload: response.data,
});
