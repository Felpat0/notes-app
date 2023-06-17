import { StyleSheet } from "react-native";
import { AlertSize, AlertVariant } from "../../types/theme";

export const getAlertStyle = (
    deviceWidth: number,
    variant: AlertVariant = "default",
    size: AlertSize = "auto"
) =>
    StyleSheet.create({
        container: {
            gap: 18,
        },
        title: { textAlign: "center" },
        message: {
            fontSize: 18,
            textAlign: "center",
        },
        buttons: {
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 10,
        },
    });
