import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  heading: {
    marginTop: Metrics.ratio(10),
    marginLeft: Metrics.ratio(19)
  },
  headText: {
    fontWeight: "bold"
  },
  submit: {
    flex: 1,
    height: Metrics.ratio(34),
    padding: Metrics.ratio(30),
    backgroundColor: Colors.ash_grey,
    color: Colors.ash_grey,
    shadowOpacity: 0.4,
    elevation: 4,
    shadowOffset: { width: 4, height: 4 },
    flexDirection: "row",
    alignItems: "center",
    shadowRadius: 8,
    shadowColor: Colors.ash_grey,
    alignSelf: "center",
    marginBottom: Metrics.ratio(20)
  }
});
