import { combineReducers } from "redux";
import dashboardReducer from "./dashboard/reducer";
import audioPlayerReducer from "./audioPlay/reducer";
import trackReducer from "./track/reducer";

const reducers = combineReducers({
  dashboard: dashboardReducer,
  audioPlayer: audioPlayerReducer,
  track: trackReducer,
});

export default reducers;
