import { StyleSheet } from "react-native";

import Constants from "expo-constants";
import { cardStyle, shadow } from "../shared/sharedStyle";

export const styles = StyleSheet.create({
  topBar: {
		paddingTop: Constants.statusBarHeight + 16,
		paddingBottom: 8,
		marginBottom: 8,
		...shadow
  },
  topTitle: {
    fontSize: 18,
    paddingHorizontal: 16,
  },
  container: {
    backgroundColor: "#F2F2F2",
    ...shadow,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
    borderRadius: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
