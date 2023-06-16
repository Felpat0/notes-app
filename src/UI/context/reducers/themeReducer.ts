import {
    ThemeActionType,
    ThemeActions,
    ThemeStateType,
} from "../../types/context";

export const initialState: ThemeStateType = {
    theme: "dark",
    alerts: [],
};

export const themeReducer = (
    state: ThemeStateType = initialState,
    action: ThemeActionType
): ThemeStateType => {
    switch (action.type) {
        case ThemeActions.SET_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        case ThemeActions.ADD_ALERT:
            return {
                ...state,
                alerts: [...state.alerts, action.payload],
            };
        case ThemeActions.REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(
                    (alert) => alert.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
