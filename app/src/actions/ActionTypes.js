// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

// network related action type
export const NETWORK_INFO = "NETWORK_INFO";

export const QUESTIONAIRE_ACTION = "QUESTIONAIRE_ACTION";

export const UPDATE_ANSWERS = "UPDATE_ANSWERS";
export const PAYMENT = "PAYMENT";
