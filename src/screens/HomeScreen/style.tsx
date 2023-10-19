import { StyleSheet } from "react-native";
import { themeColors } from "../../UI/theme/colors";

export const homeScreenStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 10,
        flexGrow: 1,
        backgroundColor: themeColors.background.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
});
