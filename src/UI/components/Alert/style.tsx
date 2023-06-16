import { StyleSheet } from "react-native";
import { AlertSize, AlertVariant } from "../../types/theme";

export const getAlertStyle = (
    deviceWidth: number,
    variant: AlertVariant = "default",
    size: AlertSize = "auto"
) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        alert: {
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
            minWidth: 300,
        },
        message: {
            fontSize: 18,
            marginBottom: 20,
        },
        buttons: {
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        button: {
            marginLeft: 10,
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#007AFF",
        },
        buttonText: {
            color: "#fff",
            fontSize: 16,
        },
    });
