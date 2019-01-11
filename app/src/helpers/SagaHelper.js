import { Alert } from "react-native";
import utils from "../util";
import { Actions } from "react-native-router-flux";

class SagaHelper {
  // redirectToHome(userType, params) {

  // }

  popStack() {
    setTimeout(() => {
      Actions.pop();
    }, 0);
  }

  popStackAndUpdateProps = props => {
    setTimeout(() => {
      Actions.pop();
      Actions.refresh(props);
    }, 0);
  };
}

export default new SagaHelper();
