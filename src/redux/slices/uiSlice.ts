import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { UIInitialStateType } from "../../types/redux";

const initialState: UIInitialStateType = {
    theme: "dark",
    alerts: [],
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setTheme: (
            state,
            action: PayloadAction<{ theme: UIInitialStateType["theme"] }>
        ) => {
            state.theme = action.payload.theme;
        },
        displayAlert: (
            state,
            action: PayloadAction<
                Draft<{ alert: UIInitialStateType["alerts"][0] }>
            >
        ) => {
            state.alerts.push(action.payload.alert);
        },
        removeAlert: (
            state,
            action: PayloadAction<{ id: UIInitialStateType["alerts"][0]["id"] }>
        ) => {
            state.alerts = state.alerts.filter(
                (alert) => alert.id !== action.payload.id
            );
        },
    },
});

export const { setTheme, displayAlert, removeAlert } = uiSlice.actions;
export default uiSlice.reducer;
