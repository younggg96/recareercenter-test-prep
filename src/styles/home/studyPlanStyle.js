import { StyleSheet } from "react-native";
import { shadow } from "../shared/sharedStyle";



export const styles = StyleSheet.create({
  content: {
    margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    flexDirection: "column",
    backgroundColor: "#fff",
    ...shadow
  },
  title: {
    paddingVertical: 16,
    paddingRight: 4,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleContent: {
    paddingVertical: 4,
    marginBottom: 4
  },
  pickStartTitle: {
    marginTop: 16,
    marginBottom: 12
  },
  submitBtn: {
    marginTop: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modal: {
    width: '60%',
  },
  modalTitle: {
    paddingVertical: 8,
  },
  modalBtn: {
    marginVertical: 8,
  },
  startDay: {
    marginBottom: 4
  }
})