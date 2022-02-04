import initialState from "./state";
import {
  SET_TRACKS_ARRAY,
  SET_CURRENT_TRACK,
  SET_RANDOM,
  SET_REPEAT,
  SET_PLAYING,
} from "./types";

const audioPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACKS_ARRAY:
      console.log(action.payload);
      return {
        ...state,
        trackList:
          state.trackList.findIndex(
            (track) => track._id === action.payload.track._id
          ) >= 0
            ? state.trackList
            : [...state.trackList, action.payload],
      };
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload,
        playing: true,
      };
    case SET_RANDOM:
      return {
        ...state,
        random: action.payload,
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat: action.payload,
      };
    case SET_PLAYING:
      return {
        ...state,
        playing: action.payload,
      };
    default:
      return state;
  }
};

export default audioPlayReducer;
