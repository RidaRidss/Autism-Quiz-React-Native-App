import init from "./init";
import { fork } from "redux-saga/effects";

export default function* root() {
  yield fork(init);
}
