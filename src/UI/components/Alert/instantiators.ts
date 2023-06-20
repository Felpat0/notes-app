import { addAlert, removeAlert } from "../../redux/slices/themeSlice";
import { store } from "../../redux/store";
import { AlertTypePayload } from "../../types/theme";

export const openAlert = (options: AlertTypePayload) => {
    store.dispatch(addAlert(options));
};

export const openConfirmationAlert = (
    options: AlertTypePayload,
    onConfirm: () => void,
    onCancel: () => void
) => {
    store.dispatch(
        addAlert({
            ...options,
            actions: [
                {
                    label: "Confirm",
                    onPress: onConfirm,
                },
                {
                    label: "Cancel",
                    onPress: onCancel,
                },
            ],
        })
    );
};

export const closeAlert = (id: number) => {
    store.dispatch(removeAlert(id));
};
