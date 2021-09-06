import { StyleSheet } from "react-native";
import { shadow } from "../shared/sharedStyle";

export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    ...shadow,
  },
  title: {
    fontWeight: "700",
    fontSize: 32,
    letterSpacing: -1,
    color: "#666",
  },
  price: {
    fontWeight: "700",
    fontSize: 42,
    color: "#000",
  },
  subtitle: {
    fontWeight: "300",
    fontSize: 20,
  },
  image: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    marginBottom: 16,
    width: "100%",
    height: 200,
  },
  header: {
    justifyContent: "center",
    alignContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderRadius: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 25,
    width: '80%'
  },
});
