import { StyleSheet } from "react-native";
import { shadow } from "../shared/sharedStyle";



export const styles = StyleSheet.create({
  content: {
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
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
    paddingVertical: 6,
    marginBottom: 4
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
  }
})