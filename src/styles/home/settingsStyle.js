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
    flexDirection: "column",
    // justifyContent: "center",
  },
  accountTitle: {
    paddingTop: 16,
    paddingHorizontal: 48,
  },
  email: {
    marginTop: 16,
    backgroundColor: '#fff',
    height: 120,
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  logOutBtn: {
    marginTop: 16,
  }
});
