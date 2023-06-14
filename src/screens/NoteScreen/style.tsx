import { StyleSheet } from "react-native";
import { themeColors } from "../../UI/theme/colors";

export const noteScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        width: "100%",
        height: "100%",
        backgroundColor: themeColors.background.primary,
        paddingTop: 10,
        paddingHorizontal: 5,
    },
    titleContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    titleInput: {
        width: "85%",
        fontSize: 20,
        fontWeight: "bold",
    },
});
