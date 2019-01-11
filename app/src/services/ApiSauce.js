import base64 from "base-64";
import { create } from "apisauce";
import {
  API_LOG,
  API_TIMEOUT,
  SERVER_URL,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_CLIENT,
  ERROR_REQUEST_TIMEOUT,
  ERROR_SERVER_CONNECTION,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_REQUEST_CANCEL,
  ERROR_CLIENT_CREDENTIALS,
  ERROR_WRONG_PHONE_NUMBER
} from "../config/WebService";
import { DataHelper } from "../helpers";

import Utils from "../util";

const api = create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: API_TIMEOUT
});

class ApiSauce {
  async put(url, data, headers) {
    const response = await api.put(url, data, { headers: headers });

    if (__DEV__ && API_LOG) {
      console.log(response);
    }

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  // for normal post requests

  async post(url, data, headers) {
    const response = await api.post(url, data, { headers: headers });

    if (__DEV__ && API_LOG) {
      console.log(response);
    }

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  // for simple get request
  async get(url, data, headers) {
    const response = await api.get(url, data, { headers: headers });

    if (__DEV__ && API_LOG) {
      console.log(response);
    }

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  // for uploading images
  async postImage(url, data) {
    const response = await api.post(url, data);

    if (__DEV__ && API_LOG) {
      console.log(response);
    }
    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  changeUrl(newURL: String) {
    api.setBaseURL(newURL);
  }

  handlePromise = (resolve, reject, response) => {
    if (response.ok && response.data && !response.data.error) {
      resolve(response.data);
    } else {
      let error = ERROR_SOMETHING_WENT_WRONG;

      switch (response.problem) {
        case "CLIENT_ERROR":
          error = ERROR_CLIENT;
          break;
        case "TIMEOUT_ERROR":
          error = ERROR_REQUEST_TIMEOUT;
          break;
        case "CONNECTION_ERROR":
          error = ERROR_SERVER_CONNECTION;
          break;
        case "NETWORK_ERROR":
          error = ERROR_NETWORK_NOT_AVAILABLE;
          Utils.noInternetMessage();
          break;
        case "CANCEL_ERROR":
          error = ERROR_REQUEST_CANCEL;
          break;
        default:
          // "SERVER_ERROR":
          error = { status: response.status, ...ERROR_SOMETHING_WENT_WRONG };
      }
      if (response.status === 500) {
        // if (response.data.message == "An unexpected error occured") {
        //   // reject(ERROR_WRONG_PHONE_NUMBER);
        // }
        reject(ERROR_SOMETHING_WENT_WRONG);
      }

      reject(
        response.data || ERROR_SOMETHING_WENT_WRONG || ERROR_WRONG_PHONE_NUMBER
      );
    }
  };
}

export default new ApiSauce();
