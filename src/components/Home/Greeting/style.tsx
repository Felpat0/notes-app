import { StyleSheet } from "react-native";
import { colors } from "../../../UI/theme/colors";

export const greetingStyle = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    greetingText: {
        fontSize: 34,
        fontWeight: "bold",
        color: colors.purple1,
        lineHeight: 34,
    },
    nameText: {
        fontSize: 44,
        lineHeight: 44,
        fontWeight: "bold",
        color: colors.skyblue1,
    },
});
