export const SERVER_URL = "http://localhost:3000";

export const API_USER_NAME = "";
export const API_PASSWORD = "";
export const API_TIMEOUT = 30000;

// GET API LOGS BY CHANGE API LOG_VALUE "TRUE"
export const API_LOG = true;

export const API_LOGIN = `${SERVER_URL}/auth/login`;

// REQUEST FAIL ERRORS

export const ERROR_REQUEST_TIMEOUT = {
  error: 1,
  title: "Request taking too much time",
  message:
    "We are sorry. It seems like something went wrong with your Internet connection"
};
export const ERROR_SERVER_CONNECTION = {
  error: 1,
  title: "Connection Error",
  message: "Server not available, bad dns."
};
export const ERROR_REQUEST_CANCEL = {
  error: 1,
  title: "Request Canceled",
  message: "You have canceled request."
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  error: 1,
  title: "Network not available",
  message: "Please connect to the working Internet."
};
export const ERROR_SOMETHING_WENT_WRONG = {
  error: 1,
  title: "Whoops",
  message: "Looks like something went wrong."
};
export const ERROR_CLIENT = {
  error: 1,
  title: "Whoops",
  message: "Looks like we did something went wrong."
};

export const ERROR_CLIENT_CREDENTIALS = {
  error: 1,
  title: "Whoops",
  message: "Invalid credentials"
};

export const ERROR_WRONG_PHONE_NUMBER = {
  error: 1,
  title: "Whoops",
  message: "Invalid phone number"
};
