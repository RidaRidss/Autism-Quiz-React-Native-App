// @flow
// Android
// title 20
// Heading 16
// desc 14

// ios
// title 20
// Heading 20
// desc 17

import { Platform } from "react-native";
import Metrics from "./Metrics";

const type = {
  AvenirNextMedium: "AvenirNext-Medium"
};

// Metrics.generatedFontSize(ios, android)

const size = {
  twelve: Metrics.generatedFontSize(12),
  fourteen: Metrics.generatedFontSize(14),
  eighteen: Metrics.generatedFontSize(18)
};

export default {
  type,
  size
};
