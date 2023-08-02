import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
