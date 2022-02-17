import initialState from "./state";
import { SET_ALL_ALBUMS, SET_ALBUMS_BY_USER } from "./types";

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.payload,
        loading: false,
      };
    case SET_ALBUMS_BY_USER:
      return {
        ...state,
        myAlbums: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default albumReducer;
