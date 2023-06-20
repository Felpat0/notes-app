import { createContext } from "react";
import { ThemeActionType, ThemeStateType } from "../../types/context";

export const initialState: ThemeStateType = {
    theme: "dark",
};

export const themeReducer = (
    state: ThemeStateType,
    action: ThemeActionType
): ThemeStateType => {
    switch (action.type) {
        case "set_theme":
            return { ...state, theme: action.payload };
        default:
            return state;
    }
};

export const ThemeContext = createContext<{
    state: ThemeStateType;
    dispatch: React.Dispatch<ThemeActionType>;
}>({
    state: initialState,
    dispatch: () => null,
});
