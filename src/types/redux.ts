import { AlertType } from "../UI/types/theme";
import { NoteType } from "./notes";

export type UIInitialStateType = {
    theme: "dark" | "light";
    alerts: AlertType[];
};

export type NotesInitialStateType = {
    notes: NoteType[];
};
