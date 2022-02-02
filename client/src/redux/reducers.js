import { combineReducers } from "redux";
import dashboardReducer from "./dashboard/reducer";

const reducers = combineReducers({
  dashboard: dashboardReducer,
});

export default reducers;
