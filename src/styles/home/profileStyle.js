import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 36,
    paddingTop: Constants.statusBarHeight + 30,
    // backgroundColor: "#dddddd",
  },
  headerContainer: {
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeaderContainer: {
    paddingTop: 22,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  settings: {
    borderRadius: 25,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 0.5,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    marginLeft: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  icon: {
    width: 32,
    height: 32,
  },
  contentContainer: {
    // transform: [{ translateY: -100 }],
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    // marginHorizontal: 36,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
