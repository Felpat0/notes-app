import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotesInitialStateType } from "../../types/redux";

const initialState: NotesInitialStateType = {
    notes: [],
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNotes: (
            state,
            action: PayloadAction<{ notes: NotesInitialStateType["notes"] }>
        ) => {
            state.notes = action.payload.notes;
        },
    },
});

export const { setNotes } = notesSlice.actions;
export default notesSlice.reducer;
