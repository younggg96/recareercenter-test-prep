import { StyleSheet } from "react-native";
import { shadow } from "../shared/sharedStyle";

export const homeStyles = StyleSheet.create({
  content: {
    // margin: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    backgroundColor: "#fff",
    ...shadow,
  },
  time: {
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginBottom: 16,
  },
  plan: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  contentItem: {
    marginRight: 16,
  },
  amount: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 4,
    borderRadius: 8,
  },
  exploreBtn: {
    marginTop: 16,
  },
  itemContainer: {
    borderRadius: 16,
    backgroundColor: "#fff",
    ...shadow,
  },
  text: {
    padding: 16,
  },
  classTitle: {
    marginBottom: 8,
  },
  classSubtitle: {
    fontSize: 14,
    // fontWeight: "700"
  },
  image: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    width: "100%",
    height: 300,
  },
  slider: {
    marginTop: 8,
    overflow: "visible", // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
});
