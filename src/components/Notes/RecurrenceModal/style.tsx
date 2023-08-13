import { StyleSheet } from "react-native";

export const recurrenceModalStyles = StyleSheet.create({
    punctualContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    inputsContainer: {
        gap: 10,
    },
    endDateSection: {
        flexDirection: "column",
        gap: 5,
    },
    endDateDatepickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 10,
        marginTop: 20,
    },
});
