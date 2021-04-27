import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  topBar: {
    paddingTop: Constants.statusBarHeight + 16,
    paddingBottom: 18,
  },
  topTitle: {
    fontSize: 18,
    paddingHorizontal: 16,
  },
  settingsContent: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "center",
  },
});
