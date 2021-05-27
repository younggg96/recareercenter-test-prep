import { StyleSheet } from "react-native";
import { shadow, cardStyle } from "../../shared/sharedStyle";

export const styles = StyleSheet.create({
  quizCard: {
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
    fontSize: 18,
    marginVertical: 4,
  },
  reviewTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  reviewContent: {
    fontSize: 16,
    marginVertical: 2,
  },
  answerReview: {
    fontSize: 16,
    marginTop: 8
  },
  correctCard: {
    ...cardStyle,
    ...shadow,
    justifyContent: "space-between",
    backgroundColor: "#7DB46F",
  },
  inCorrectCard: {
    ...cardStyle,
    ...shadow,
    justifyContent: "space-between",
    backgroundColor: "#FF7070",
  },
  controlBtn: {
    marginTop: 24,
    color: "#fff",
    paddingVertical: 8
  }
});
