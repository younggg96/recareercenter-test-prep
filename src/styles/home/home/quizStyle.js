import { StyleSheet } from "react-native";
import { shadow } from "../../shared/sharedStyle";

export const styles = StyleSheet.create({
  quizCard: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    ...shadow,
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
  }
});
