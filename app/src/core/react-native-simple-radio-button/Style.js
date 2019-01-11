var React = require("react");
var ReactNative = require("react-native");
import { Colors, Metrics, Fonts } from "../../../src/theme";

var { StyleSheet } = ReactNative;

var Style = StyleSheet.create({
  radioForm: {},

  radioWrap: {
    flexDirection: "row",
    marginBottom: 15
  },
  radio: {
    justifyContent: "center",
    alignItems: "center",

    width: 30,
    height: 30,

    alignSelf: "center",
    borderColor: "#c0c5d3",
    backgroundColor: "#ecedf2",
    borderRadius: 30,
    borderWidth: 1
  },

  radioLabel: {
    paddingLeft: 10,
    fontFamily: Fonts.type.AvenirNextDemiBold,
    fontSize: Fonts.size.fourteen
  },

  radioNormal: {
    borderRadius: 10
  },

  radioActive: {
    width: 20,
    height: 20,
    backgroundColor: "#2196f3"
  },

  labelWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },

  labelVerticalWrap: {
    flexDirection: "column",
    paddingLeft: 10
  },

  labelVertical: {
    paddingLeft: 0
  },

  formHorizontal: {
    flexDirection: "row"
  }
});

module.exports = Style;
