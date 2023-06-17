import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertTypePayload, ThemeType } from "../../types/theme";
import { ThemeStateType } from "../../types/redux";

export const initialState: ThemeStateType = {
    theme: "dark",
    alerts: [],
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeType>) => {
            state.theme = action.payload;
        },
        addAlert: (state, action: PayloadAction<AlertTypePayload>) => {
            const id = state.alerts.length + 1;
            // @ts-ignore
            state.alerts.push({ ...action.payload, id });
        },
        removeAlert: (state, action: PayloadAction<number>) => {
            state.alerts = state.alerts.filter(
                (alert) => alert.id !== action.payload
            );
        },
    },
});

export const { setTheme, addAlert, removeAlert } = themeSlice.actions;
