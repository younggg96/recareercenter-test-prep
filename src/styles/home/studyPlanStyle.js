import { StyleSheet } from "react-native";
import { shadow } from "../shared/sharedStyle";



export const styles = StyleSheet.create({
  content: {
    marginTop: 16,
    marginHorizontal: 32,
    borderRadius: 4,
    flexDirection: "column",
    backgroundColor: "#fff",
    ...shadow
  },
  title: {
    paddingTop: 16,
    paddingHorizontal: 48,
  }
})