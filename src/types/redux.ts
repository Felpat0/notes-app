import { AlertType } from "../UI/types/theme";
import { ChecklistType } from "./checklists";
import { NoteType } from "./notes";

export type UIInitialStateType = {
    theme: "dark" | "light";
    alerts: AlertType[];
};

export type NotesInitialStateType = {
    notes: NoteType[];
};

export type ChecklistsInitialStateType = {
    checklists: ChecklistType[];
};
