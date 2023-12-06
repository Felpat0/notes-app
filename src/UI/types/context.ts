import { ThemeType } from "./theme";

type SetThemeActionType = {
    type: "set_theme";
    payload: ThemeType;
};

export type ThemeActionType = SetThemeActionType;
export type ThemeStateType = {
    theme: ThemeType;
};
