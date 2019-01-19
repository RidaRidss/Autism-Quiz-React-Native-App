// @flow
import React from "react";
import { connect } from "react-redux";
import { Navigator } from "react-native-deprecated-custom-components";
import { Stack, Scene, Router, Actions } from "react-native-router-flux";
import { Animated, Easing } from "react-native";
import { Colors, Images } from "../theme";
import { Home } from "../container";
import { Text, NavIcon } from "../components";

import styles from "./styles";

// const BACK_SCENES = "home";

function onBackPress() {
  const scene = Actions.currentScene;
  if (BACK_SCENES.includes(scene)) {
    return false;
  }
  Actions.pop();
  return true;
}

const mapStateToProps = state => {
  return state;
};

const ConnectedNavIcon = connect(mapStateToProps)(NavIcon);

let TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;
    }
  };
};
const navigator = Actions.create(
  <Stack
    transitionConfig={TransitionConfiguration}
    swipeEnabled
    gestureEnabled
    animationEnabled
    direction="horizontal"
    lazy
    titleStyle={styles.title}
    headerStyle={styles.header}
    key="root"
    tintColor={Colors.primary}
  >
    <Scene
      right={() => (
        <ConnectedNavIcon
          rippleEffectFalse="false"
          style={styles.rightButtonStyle}
          onPress={() => alert("i am right")}
          icon={Images.call}
          // source={Images.call}
        />
      )}
      title="Dashboard"
      initial
      key="home"
      component={Home}
    />
  </Stack>
);

export default () => (
  <AppNavigator backAndroidHandler={onBackPress} navigator={navigator} />
);

const AppNavigator = connect()(Router);
