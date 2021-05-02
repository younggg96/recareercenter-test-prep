import { StyleSheet } from "react-native";
import { shadow } from "../../shared/sharedStyle";

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
        justifyContent: "space-between",
        alignItems: "center",
    },
})