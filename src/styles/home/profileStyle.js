import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 30,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  background: {
    // backgroundColor: "#E52326"
  },
  subHeaderContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  settings: {
    borderRadius: 25,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  text: {
    marginLeft: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  icon: {
    width: 32,
    height: 32,
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  prograssBar: {
    marginTop: 24,
    paddingHorizontal: 24,
    width: '95%',
    height: 120,
    borderRadius: 100,
    flexDirection: "column",
    justifyContent: "center",
  },
  prograssTitle: {
    fontWeight: 'bold'
  },
  totalStats: {
    width: '95%',
    paddingHorizontal: 24,
    flexDirection: 'column',
  },
  total: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
