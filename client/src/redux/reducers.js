import { combineReducers } from "redux";
import audioPlayerReducer from "./audioPlay/reducer";
import trackReducer from "./track/reducer";
import playlistReducer from "./playlist/reducer";
import albumReducer from "./album/reducer";

const reducers = combineReducers({
  audioPlayer: audioPlayerReducer,
  track: trackReducer,
  playlist: playlistReducer,
  album: albumReducer,
});

export default reducers;
