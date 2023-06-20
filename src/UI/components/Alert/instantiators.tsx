import { Alert, AlertButton } from "react-native";
import { AlertOptions } from "../../types";

export const openAlert = (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions
) => {
    Alert.alert(title, message, buttons, options);
};

export const openConfirmationAlert = (
    options: AlertOptions,
    onConfirm: () => void,
    onCancel: () => void
) => {
    Alert.alert(
        "ao",
        "Sei sicuro?",
        [
            {
                text: "Si",
                onPress: onConfirm,
            },
            {
                text: "No",
                onPress: onCancel,
            },
        ],
        options
    );
};
