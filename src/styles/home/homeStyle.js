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
    borderRadius: 16,
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
  container: {
    flex: 1,
    paddingTop: 8,
  },
  categoryContainer: {
    flex: 1,
    paddingTop: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    marginHorizontal: 10,
    height: 132,
    width: 200,
    justifyContent: "space-between",
    borderRadius: 8,
    shadowColor: '#171717',
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  categoryItem: {
    justifyContent: "space-between",
    margin: 12,
    height: 180,
    width: 160,
    borderRadius: 8,
    shadowColor: '#171717',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  categoryTitle: {
    paddingHorizontal: 12,
    paddingTop: 12,
    fontWeight: "700",
  },
  itemContent: {
    backgroundColor: "#E42425",
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  itemLockedContent: {
    backgroundColor: "#666666",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modal: {
    // marginTop: '100%',
    width: '80%',
  },
  modalCard: {
    height: 300,
    borderRadius: 16,
    justifyContent: 'center'
  },
  modalCard2: {
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center'
  },
  modalSelect: {
    marginBottom: 8
  },
  modalSubmit: {
    marginTop: 8
  },
  modalTitle: {
    paddingVertical: 8,
  },
  modalBtn: {
    marginVertical: 8,
  },
});
