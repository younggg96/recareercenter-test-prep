import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  paragraph: {
    fontWeight: "700",
    letterSpacing: -2,
    marginBottom: 8,
  },
  paragraphSignup: {
    width: 300,
    fontWeight: "700",
    letterSpacing: -2,
    marginBottom: 16
  },
  paragraphReset: {
    letterSpacing: -1,
    fontWeight: "700",
  },
  forgetBtn: {
    marginVertical: 4,
    alignItems: "flex-end",
  },
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 16,
    borderRadius: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 16,
  },
  createAccBtn: {
    marginTop: 8,
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
