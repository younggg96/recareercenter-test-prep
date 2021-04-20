import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    margin: 32,
  },
  paragraph: {
    marginBottom: 48,
    width: 200,
    fontWeight: "800",
    textAlign: "left",
    letterSpacing: -2,
  },
  forgetBtn: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 18,
    borderRadius: 8,
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
  },
  otherTitle: {
    marginTop: 24,
    textAlign: "center",
  },
  other: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  otherBtnLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  otherBtn: {
    width: "80%",
    margin: 8,
    borderRadius: 8,
  },
});
