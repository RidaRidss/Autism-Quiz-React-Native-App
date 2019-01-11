import { combineReducers } from "redux";

// get navigator state

import navigator from "./navigator";

// get network info state

import networkInfo from "./networkInfo";

import questionaire from "./questionaire";

export default combineReducers({
  route: navigator,
  networkInfo,
  questionaire
});
