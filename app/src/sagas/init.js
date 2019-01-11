import { LOAD } from "redux-storage";
import { take, fork, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";

function* watchReduxLoadFromDisk() {
  while (true) {
    yield take(LOAD);
    try {
    } catch (err) {
      console.warn("saga watchReduxLoadFromDisk error: ", err);
    }
  }
}
export default function* root() {
  yield fork(watchReduxLoadFromDisk);
}
