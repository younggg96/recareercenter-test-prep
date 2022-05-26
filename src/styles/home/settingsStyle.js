import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { shadow } from "../shared/sharedStyle";

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
  },
  accountTitle: {
    paddingTop: 16,
    paddingHorizontal: 48,
  },
  email: {
    marginTop: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 48,
    ...shadow
  },
  logOutBtn: {
    marginTop: 12,
    height: 36
  }
});
