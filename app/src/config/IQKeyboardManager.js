// @flow
import { Platform } from "react-native";
import { KeyboardManager } from "react-native-keyboard-manager";
import util from "../util";

class IQKeyboardManager {
  setEnable(enable: boolean = true) {
    if (util.isPlatformIOS) {
      KeyboardManager.setEnable(enable);
    }
  }
  setToolbarPreviousNextButtonEnable(enable: boolean = true) {
    if (util.isPlatformIOS) {
      KeyboardManager.setToolbarPreviousNextButtonEnable(enable);
    }
  }
}

export default new IQKeyboardManager();
