import { Alert } from "react-native";
import utils from "../util";
import { Actions } from "react-native-router-flux";
import SagaHelper from "./SagaHelper";

class RedirectionHelper {
  redirectIfLoggedIn(userData) {
    if (userData.accessToken && userData.id) {
      Actions.dashboard({ type: "reset" });
    }
  }
}

export default new RedirectionHelper();
