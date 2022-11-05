import { StyleSheet } from "react-native";
import { shadow, cardStyle } from "../../shared/sharedStyle";

export const styles = StyleSheet.create({
    content: {
        paddingBottom: 8,
        flexDirection: "column",
        backgroundColor: "#fff",
        flex: 1,
    },
    tabContainer: {
        paddingLeft: 12,
        justifyContent: 'center',
    },
    ItemCard: {
        borderRadius: 16,
        paddingHorizontal: 16,
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})