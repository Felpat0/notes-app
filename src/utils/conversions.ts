import { NoteType } from "../types/notes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const firestoreNoteToNote = (note: any): NoteType => {
    return {
        ...note,
        createdAt: note.createdAt.toDate(),
        updatedAt: note.updatedAt.toDate(),
    };
};
