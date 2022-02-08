import initialState from "./state";
import { SET_ALL_PLAYLISTS, SET_PLAYLISTS_BY_USER } from "./types";

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PLAYLISTS:
      return {
        ...state,
        allPlaylists: action.payload,
        loading: false,
      };
    case SET_PLAYLISTS_BY_USER:
      return {
        ...state,
        myPlayLists: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default playlistReducer;
