import { AlertType } from "../UI/types/theme";

export type InitialStateType = {
    theme: "dark" | "light";
    alerts: AlertType[];
};
