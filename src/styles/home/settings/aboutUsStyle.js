import { StyleSheet } from "react-native";
import { shadow } from "../../shared/sharedStyle";

export const styles = StyleSheet.create({
    content: {
        margin: 16,
        padding: 16,
        borderRadius: 4,
        backgroundColor: "#fff",
        ...shadow
    },
    logo: {
        width: 300,
        height: 80,
        marginBottom: 16
    },
    title: {
        paddingVertical: 16,
        alignItems: "center",
    },
    titleContent: {
        fontWeight: 'bold',
        marginBottom: 16
    },
})