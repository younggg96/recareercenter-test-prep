import { StyleSheet } from "react-native";
import { shadow } from "../../shared/sharedStyle";

export const styles = StyleSheet.create({
    quizCard: {
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
        padding: 16,
        borderRadius: 16,
        // flexDirection: "column",
        backgroundColor: "#fff",
        ...shadow,
    },
    questionTitle: {
        // height: 100,
        marginBottom: 16
    }
})