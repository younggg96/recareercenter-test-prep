import { StyleSheet } from "react-native";
import { shadow, cardStyle } from "../../shared/sharedStyle";

export const styles = StyleSheet.create({
  questionCard: {
    ...cardStyle,
    ...shadow,
    backgroundColor: "#fff",
  },
  questionTitle: {
    marginVertical: 16,
  },
  button: {
    marginTop: 32,
    borderRadius: 16,
  },

  title: {
    marginVertical: 4,
  },
  reviewTitle: {
    marginBottom: 16,
  },
  reviewContent: {
    marginVertical: 2,
  },
  answerReview: {
    marginTop: 8,
  },
  correctCard: {
    ...cardStyle,
    ...shadow,
    backgroundColor: "#8ACE8B",
  },
  inCorrectCard: {
    ...cardStyle,
    ...shadow,
    backgroundColor: "#FF9B9B",
  },
  correctionCards: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  correctionCard: {
    maxWidth: 120,
    height: 100,
  },
});
