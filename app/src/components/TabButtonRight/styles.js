import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    height: Metrics.navBarHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width:Metrics.ratio(44),
    height:Metrics.ratio(40),
    paddingRight:Metrics.ratio(25),
    paddingLeft:Metrics.ratio(25)
  },
  icon: {
    width: Metrics.image.twofour,
    height: Metrics.image.twofour
  }
});
