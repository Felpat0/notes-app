import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateType } from "../../types/redux";

const initialState: InitialStateType = {
    theme: "dark",
    alerts: [],
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setTheme: (
            state,
            action: PayloadAction<{ theme: InitialStateType["theme"] }>
        ) => {
            state.theme = action.payload.theme;
        },
        displayAlert: (
            state,
            action: PayloadAction<
                Draft<{ alert: InitialStateType["alerts"][0] }>
            >
        ) => {
            state.alerts.push(action.payload.alert);
        },
        removeAlert: (
            state,
            action: PayloadAction<{ id: InitialStateType["alerts"][0]["id"] }>
        ) => {
            state.alerts = state.alerts.filter(
                (alert) => alert.id !== action.payload.id
            );
        },
    },
});

export const { setTheme, displayAlert, removeAlert } = uiSlice.actions;
export default uiSlice.reducer;
