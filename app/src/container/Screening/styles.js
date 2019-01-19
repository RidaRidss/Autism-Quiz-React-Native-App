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
  diagnosis: {
    height: Metrics.ratio(34),
    marginTop: Metrics.ratio(19),
    marginHorizontal: Metrics.ratio(20),
    padding: Metrics.ratio(30),
    backgroundColor: Colors.ash_grey,
    color: Colors.ash_grey,
    justifyContent: "center",
    shadowOpacity: 0.4,
    elevation: 4,
    textAlign: "center",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 8,
    shadowColor: Colors.ash_grey
  }
});
