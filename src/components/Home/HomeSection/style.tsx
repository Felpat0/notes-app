import { StyleSheet } from "react-native";
import { colors } from "../../../UI/theme/colors";

export const homeSectionStyles = StyleSheet.create({
    container: {
        gap: 10,
    },
    titleContainer: {
        color: colors.white1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 8,
    },
    children: {},
});
