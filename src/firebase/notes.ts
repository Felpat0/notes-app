import firestore from "@react-native-firebase/firestore";
import { NoteCreationType, NoteType } from "../types/notes";
import { firestoreNoteToNote } from "../utils/conversions";
import { getCurrentUser } from "./auth";

export const noteRef = (noteId: string) =>
    firestore().collection("notes").doc(noteId);

export const notesRef = firestore()
    .collection("notes")
    .where("userId", "==", getCurrentUser()?.uid);

// eslint-disable-next-line @typescript-eslint/ban-types
export const performNoteAction = async (action: Function) => {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("User not logged in");

    return await action();
};

export const getNotes = async (): Promise<NoteType[]> =>
    performNoteAction(async () => {
        const toReturn: NoteType[] = [];

        const querySnapshot = await notesRef.get();

        querySnapshot.forEach((doc) => {
            toReturn.push(
                firestoreNoteToNote({
                    ...doc.data(),
                    id: doc.id,
                })
            );
        });

        return toReturn;
    });

export const getNoteById = async (
    noteId: string
): Promise<NoteType | undefined> =>
    performNoteAction(async () => {
        const noteSnapshot = await noteRef(noteId).get();

        if (noteSnapshot.exists) {
            return firestoreNoteToNote({
                ...noteSnapshot.data(),
                id: noteSnapshot.id,
            });
        }
    });

export const createNote = async (note?: NoteCreationType): Promise<NoteType> =>
    performNoteAction(async () => {
        const currentUser = getCurrentUser();
        const newNoteData = {
            ...note,
            userId: currentUser?.uid,
            title: note?.title || "",
            content: note?.content || "",
            createdAt: firestore.Timestamp.now(),
            updatedAt: firestore.Timestamp.now(),
        };

        const newNoteRef = await firestore()
            .collection("notes")
            .add(newNoteData);
        await newNoteRef.update({ id: newNoteRef.id });

        return getNoteById(newNoteRef.id);
    });

export const updateNote = async (note: NoteType): Promise<NoteType> =>
    performNoteAction(async () => {
        const currentUser = getCurrentUser();
        const newNoteData = {
            ...note,
            userId: currentUser?.uid,
            updatedAt: firestore.Timestamp.now(),
        };
        await noteRef(newNoteData.id).update(newNoteData);

        return getNoteById(newNoteData.id);
    });

export const deleteNote = async (noteId: string): Promise<void> =>
    performNoteAction(async () => {
        await noteRef(noteId).delete();
    });
