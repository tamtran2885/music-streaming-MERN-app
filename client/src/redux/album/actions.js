import { fetchAlbums, fetchAlbumsByUser } from "../../services/fetchData.js";
import { SET_ALL_ALBUMS, SET_ALBUMS_BY_USER } from "./types";

// Get data
export const getAllAlbums = () => {
  return async (dispatch) => {
    try {
      const response = await fetchAlbums();
      dispatch(setAllAlbums(response));
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setAllAlbums = (response) => ({
  type: SET_ALL_ALBUMS,
  payload: response.data,
});

// Get tracks by user
export const getAlbumsByUser = (useFbId) => {
  return async (dispatch) => {
    try {
      const response = await fetchAlbumsByUser(useFbId);
      dispatch(setAlbumsByUser(response));
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setAlbumsByUser = (response) => ({
  type: SET_ALBUMS_BY_USER,
  payload: response.data,
});
