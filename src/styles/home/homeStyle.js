import { StyleSheet } from "react-native";
import { shadow } from "../shared/sharedStyle";

export const homeStyles = StyleSheet.create({
  content: {
    margin: 16,
    padding: 16,
    borderRadius: 4,
    flexDirection: "column",
    backgroundColor: "#fff",
    ...shadow
  },
  time: {
    marginBottom: 4,
  }
})