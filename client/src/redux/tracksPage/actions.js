import { fetchTracksByUser } from "../../services/fetchData.js";

import { SET_TRACKS_INFO_USER } from "./types";

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
  type: SET_TRACKS_INFO_USER,
  payload: response,
});
