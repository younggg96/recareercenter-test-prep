import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 32,
    marginRight: 32,
  },
  logo: {
    width: 300,
    height: 80
  },
  title: {
    marginTop: 36,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  subTitle: {
    marginTop: 8,
  },
  button: {
    width: '80%',
    marginTop: '80%',
    borderRadius: 16,
  },
  spinner: {
    marginTop: '80%',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});