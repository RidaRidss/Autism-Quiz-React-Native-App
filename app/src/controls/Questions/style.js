import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  componentParent: {
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(20)
  },
  questionContainer: {
    flexDirection: "row",
    marginHorizontal: Metrics.ratio(19)
  },

  answerContainer: {
    marginHorizontal: Metrics.ratio(19)
  },
  radioForm: {
    marginTop: Metrics.ratio(25),
    color: Colors.ash_grey
  },
  labelStyle: {
    marginHorizontal: 10
  },
  textInput: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: Metrics.ratio(25)
  }
});
