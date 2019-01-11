import { combineReducers } from "redux";

// get navigator state

import navigator from "./navigator";

// get network info state

import networkInfo from "./networkInfo";

export default combineReducers({
  route: navigator,
  networkInfo
});
