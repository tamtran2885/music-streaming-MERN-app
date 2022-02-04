import { combineReducers } from "redux";
import dashboardReducer from "./dashboard/reducer";
import audioPlayerReducer from "./audioPlay/reducer";

const reducers = combineReducers({
  dashboard: dashboardReducer,
  audioPlayer: audioPlayerReducer,
});

export default reducers;
