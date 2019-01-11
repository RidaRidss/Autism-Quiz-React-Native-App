/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Provider } from "react-redux";

import {
  Platform,
  AppState,
  BackHandler,
  NativeModules,
  View
} from "react-native";

import { Actions } from "react-native-router-flux";

import NetworkInfo from "./services/NetworkInfo";
import { networkInfoListener } from "./actions/NetworkInfoActions";

const reducers = require("./reducers").default;

import configureStore from "./store";
import applyConfigSettings from "./config";
import AppNavigator from "./navigator";

import { MessageBar } from "./components";

import { DataHelper } from "./helpers";

import Utils from "./util";
import BACK_SCENES from "./constants";

applyConfigSettings();

export default class App extends Component<{}> {
  state = {
    isLoading: true,
    store: configureStore(reducers, newState => {
      this.setState({ isLoading: false }, () => {
        DataHelper.setStore(this.state.store);
        this.onLoadingComplete();
      });
    })
  };

  componentDidMount() {
    if (Utils.isPlatformAndroid()) NativeModules.SplashScreen.hide();
    if (Utils.isJSDebugMode()) console.log("Debug Mode Is Enabled");
    BackHandler.addEventListener("hardwareBackPress", () => null);

    console.disableYellowBox = true;

    NetworkInfo.networkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
  }

  componentWillMount() {
    NetworkInfo.removeNetworkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
  }

  componentWillUnmount() {
    NetworkInfo.removeNetworkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  onLoadingComplete = () => {
    NetworkInfo.networkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
    AppState.addEventListener("change", this._handleAppStateChange);
  };

  _handleAppStateChange = nextAppState => {};

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
        <MessageBar />
      </View>
    );
  }
}
