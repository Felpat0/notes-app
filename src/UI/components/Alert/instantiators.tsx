import { Alert, AlertButton } from "react-native";
import { AlertOptions } from "../../types";
import i18n from "../../../localization/i18n";

export const openAlert = (
    title = "",
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions
) => {
    Alert.alert(title, message, buttons, options);
};

export const openConfirmationAlert = (
    options: AlertOptions,
    onConfirm: () => void,
    onCancel: () => void,
    title = "",
    message?: string
) => {
    Alert.alert(
        title,
        message || i18n.t("ui.alerts.confirmOperation"),
        [
            {
                text: i18n.t("ui.buttons.confirm"),
                onPress: onConfirm,
            },
            {
                text: i18n.t("ui.buttons.cancel"),
                onPress: onCancel,
            },
        ],
        options
    );
};
