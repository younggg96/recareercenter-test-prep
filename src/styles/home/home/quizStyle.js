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
    marginTop: 8,
  },
  notFinishedCard: {
    ...cardStyle,
    ...shadow,
    justifyContent: "space-between",
    backgroundColor: "#A3A3A3",
  },
  correctCard: {
    ...cardStyle,
    ...shadow,
    justifyContent: "space-between",
    backgroundColor: "#8ACE8B",
  },
  inCorrectCard: {
    ...cardStyle,
    ...shadow,
    justifyContent: "space-between",
    backgroundColor: "#FF9B9B",
  },
  controlBtn: {
    marginTop: 16,
    color: "#fff",
    paddingVertical: 8,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modal: {
    width: "80%",
    borderRadius: 25,
    overflow: "hidden"
  },
  modalCard: {
    paddingVertical: 8,
    borderRadius: 16,
  },
  modalTitle: {
    textAlign: "center",
    paddingVertical: 8,
  },
});
