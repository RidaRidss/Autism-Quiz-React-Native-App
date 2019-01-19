// @flow
import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";
import utils from "../util";

const initialState = Immutable({
  isFetching: false,
  data: [{ payStatus: true }]
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.PAYMENT:
      stateData = _.cloneDeep(state.data);
      data = stateData;
      return Immutable.merge(state, {
        data: stateData,
        isFetching: false
      });
    default:
      return state;
  }
};
