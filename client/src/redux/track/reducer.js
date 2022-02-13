import initialState from "./state";
import {
  SET_ALL_TRACKS,
  TRACK_ERROR,
  UPDATE_LIKES,
  DELETE_TRACK,
  SET_TRACKS_BY_USER,
  SET_FAV_TRACKS_BY_USER,
} from "./types";

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_TRACKS:
      return {
        ...state,
        allTracks: action.payload,
        loading: false,
      };
    case SET_TRACKS_BY_USER:
      return {
        ...state,
        myTracks: action.payload,
        loading: false,
      };
    case TRACK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
      };
    case DELETE_TRACK:
      return {
        ...state,
        myTracks: state.myTracks.filter(
          (track) => track._id !== action.payload
        ),
        loading: false,
      };
    case SET_FAV_TRACKS_BY_USER:
      return {
        ...state,
        favTracksByUser: action.payload,
      };
    default:
      return state;
  }
};

export default trackReducer;
