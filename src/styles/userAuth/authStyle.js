import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    margin: 32,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  paragraph: {
    fontWeight: "700",
    letterSpacing: -2,
  },
  paragraphSignup: {
    width: 300,
    fontWeight: "800",
    letterSpacing: -2,
  },
  paragraphReset: {
    marginVertical: 8,
    fontWeight: "700",
  },
  forgetBtn: {
    // marginVertical: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 12,
    borderRadius: 16,
  },
  button: {
    marginBottom: 12,
    borderRadius: 16,
  },
  createAccBtn: {
    marginTop: 26,
    borderRadius: 16,
  },
  otherTitle: {
    marginTop: 8,
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
    marginTop: 8,
    borderRadius: 16,
  },
  topBar: {
    backgroundColor: "#F2F2F2",
    marginTop: Constants.statusBarHeight,
  },
  topTitle: {
    fontSize: 18,
    paddingHorizontal: 16,
  },
});
