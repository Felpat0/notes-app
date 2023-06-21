import { StyleSheet } from "react-native";
import { themeColors } from "../../UI/theme/colors";

export const homeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
        width: "100%",
        height: "100%",
        backgroundColor: themeColors.background.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
});
