// @flow
import { StyleSheet, Platform } from "react-native";
import { Fonts, Colors, Metrics } from "../theme";
import Utils from "../util";

export default StyleSheet.create({
  header: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    backgroundColor: Colors.navbar.background
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.ash_grey,
    fontWeight: Platform.OS === "ios" ? "200" : "100",
    width: Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin)
  },
  rightButtonStyle: {
    marginRight: Metrics.smallMargin
  }
});
