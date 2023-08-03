import { NoteType } from "../types/notes";
import { isDateIncludedInRecurrence } from "./datetime";

export const isNotePinned = (note: NoteType, date: Date) => {
    return (
        note.pinned ||
        note.recurrences.some((recurrence) =>
            isDateIncludedInRecurrence(date, recurrence)
        )
    );
};
