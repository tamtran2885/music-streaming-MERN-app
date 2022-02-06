import initialState from "./state";
import { SET_TRACKS_INFO_USER } from "./types";

const tracksPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACKS_INFO_USER:
      return {
        ...state,
        tracks: action.payload,
      };
    default:
      return state;
  }
};

export default tracksPageReducer;
