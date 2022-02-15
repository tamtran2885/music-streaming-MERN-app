import initialState from "./state";
import {
  SET_ALL_PLAYLISTS,
  SET_PLAYLISTS_BY_USER,
  SET_CURRENT_PLAYLIST,
  SET_CURRENT_PLAYLIST_INFO,
  SET_FOLLOWING_PLAYLISTS_BY_USER,
} from "./types";

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
        myPlaylists: action.payload,
        loading: false,
      };
    case SET_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.payload,
        loading: false,
      };
    case SET_CURRENT_PLAYLIST_INFO:
      return {
        ...state,
        currentPlaylistInfo: action.payload,
        loading: false,
      };
    case SET_FOLLOWING_PLAYLISTS_BY_USER:
      return {
        ...state,
        myFollowingPlaylists: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default playlistReducer;
