import { NoteRecurrenceType, NoteType } from "../types/notes";
import firestore from "@react-native-firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const firestoreNoteToNote = (note: any): NoteType => {
    return {
        ...note,
        createdAt: note.createdAt.toDate(),
        updatedAt: note.updatedAt.toDate(),
        recurrence: note.recurrence
            ? firestoreRecurrenceToRecurrence(note.recurrence)
            : undefined,
    };
};

export const firestoreRecurrenceToRecurrence = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recurrence: any
): NoteRecurrenceType => {
    return {
        ...recurrence,
        startDate: recurrence.startDate
            ? recurrence.startDate.toDate()
            : undefined,
        endDate: recurrence.endDate ? recurrence.endDate.toDate() : undefined,
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prepareForFirestore = (body: any) => {
    // Execute deleteField() on all fields that are undefined
    Object.keys(body).forEach((key) => {
        if (body[key] === undefined) body[key] = firestore.FieldValue.delete();
    });

    return body;
};
