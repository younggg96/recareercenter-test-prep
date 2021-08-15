import { StyleSheet } from "react-native";
import { shadow } from "../shared/sharedStyle";

export const styles = StyleSheet.create({
    content: {
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
        padding: 16,
        borderRadius: 16,
        flexDirection: "column",
        backgroundColor: "#fff",
        ...shadow,
    },
    title: {
        fontWeight: "500",
        fontSize: 24,
        marginBottom: 8,
    },
    subtitle: {
        fontWeight: "300",
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 20
    },
    image: {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        marginBottom: 16,
        width: "100%",
        height: 200,
    },
})