import { ButtonProps } from "../components/Button";

export type ThemeType = "dark";

export type ActionType = ButtonProps & {
    label: string;
    onClick: () => void;
};

export type AlertType = {
    id: number;
    message: string;
    type: "success" | "error" | "warning" | "info";
    isOpen: boolean;
    onClose: () => void;
    actions: ActionType[];
};

export enum ThemeActions {
    SET_THEME = "SET_THEME",
    ADD_ALERT = "ADD_ALERT",
    REMOVE_ALERT = "REMOVE_ALERT",
}

export type ThemeActionType =
    | { type: ThemeActions.SET_THEME; payload: ThemeType }
    | { type: ThemeActions.ADD_ALERT; payload: AlertType }
    | { type: ThemeActions.REMOVE_ALERT; payload: AlertType["id"] };

export type ThemeStateType = {
    theme: ThemeType;
    alerts: AlertType[];
};
