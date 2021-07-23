import { StyleSheet } from "react-native";
import { shadow, cardStyle } from "../shared/sharedStyle";

export const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 8
    },
    questionCard: {
        ...cardStyle,
        ...shadow,
        backgroundColor: "#fff",
    },
    questionTitle: {
        marginVertical: 16,
    },
    button: {
        marginTop: 16,
        borderRadius: 16,
    },
})