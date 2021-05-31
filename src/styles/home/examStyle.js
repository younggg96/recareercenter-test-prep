import { StyleSheet } from "react-native";
import { shadow } from "../shared/sharedStyle";

export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    backgroundColor: "#fff",
    ...shadow,
  },
  title: {
    marginBottom: 8,
  },
  time: {
    marginBottom: 4,
  },
  button: {
    marginTop: 4,
    borderRadius: 8,
  },
});
