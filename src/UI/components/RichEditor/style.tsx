import { StyleSheet } from "react-native";
import { themeColors } from "../../theme/colors";

export const richEditorStyle = StyleSheet.create({
    container: {
        flex: 1,
        color: themeColors.text.paragraph.primary,
    },
    toolbar: {},
    editor: {
        backgroundColor: themeColors.background.primary,
        color: themeColors.text.paragraph.primary,
    },
});
