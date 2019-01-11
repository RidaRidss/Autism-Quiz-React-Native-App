import { Alert } from "react-native";
import utils from "../util";

class ErrorHelper {
  handleErrors(err, doAlert) {
    if (doAlert) {
      const errObj = err && err.message ? err : err.error;
      const errName =
        errObj && (errObj.name || errObj.title)
          ? errObj.name || errObj.title
          : "Error!";

      const errMsg = errObj && errObj.message ? errObj.message : "";

      utils.showAlertWithDelay(errName, errMsg, 1000);
    }
  }
}

export default new ErrorHelper();
