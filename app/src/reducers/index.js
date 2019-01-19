import { combineReducers } from "redux";

// get navigator state

import navigator from "./navigator";

// get network info state

import networkInfo from "./networkInfo";

import questionaire from "./questionaire";
import payment from "./payment";

export default combineReducers({
  route: navigator,
  networkInfo,
  questionaire,
  payment
});
