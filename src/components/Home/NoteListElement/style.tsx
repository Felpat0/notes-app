import { colors } from "../../../UI/theme/colors";
import { StyleSheet } from "react-native";

export const noteListElementStyles = StyleSheet.create({
    rectangle: {
        backgroundColor: colors.purple2,
        borderRadius: 10,
        height: 75,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.white1,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.skyblue1,
    },
});
