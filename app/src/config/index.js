// @flow
import {Text, StatusBar }from "react-native"; 
import IQKeyboardManager from "./IQKeyboardManager"; 
import DebugSettings from "./DebugSettings"; 
import AppConfig from "./AppConfig"; 

export default () =>  {
  if (__DEV__) {
    console.disableYellowBox =  ! DebugSettings.yellowBox; 
  }

    StatusBar.setBarStyle("light-content"); 
    // StatusBar.setBarStyle("dark-content");

  Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling; 
}; 
