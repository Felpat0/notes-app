import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import notesReducer from "./slices/notesSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        notes: notesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
