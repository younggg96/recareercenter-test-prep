import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginLeft: 32,
    marginRight: 32,
  },
  header: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 300,
    height: 80
  },
  start: {
    width: 300,
    height: 250,
    marginBottom: 32
  },
  title: {
    marginTop: 16,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  subTitle: {
    marginTop: 8,
  },
  button: {
    borderRadius: 16,
  },
  spinner: {
    // marginTop: '60%',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});