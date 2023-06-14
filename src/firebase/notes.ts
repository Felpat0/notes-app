import firestore from "@react-native-firebase/firestore";
import { NoteCreationType, NoteType } from "../types/notes";
import { firestoreNoteToNote } from "../utils/conversions";
import { getCurrentUser } from "./auth";

// eslint-disable-next-line @typescript-eslint/ban-types
export const performNoteAction = async (action: Function) => {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) throw new Error("User not logged in");

        return await action();
    } catch (error) {
        console.log("Error in performNoteAction: ", error);
    }
    return undefined;
};

export const getNotes = async (): Promise<NoteType[]> =>
    performNoteAction(async () => {
        const currentUser = getCurrentUser();
        const toReturn: NoteType[] = [];

        const querySnapshot = await firestore()
            .collection("notes")
            .where("userId", "==", currentUser?.uid)
            .get();

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
        const noteSnapshot = await firestore()
            .collection("notes")
            .doc(noteId)
            .get();
        if (noteSnapshot.exists) {
            return firestoreNoteToNote({
                ...noteSnapshot.data(),
                id: noteSnapshot.id,
            });
        }
    });

export const createNote = async (
    note: NoteCreationType
): Promise<NoteType | undefined> =>
    performNoteAction(async () => {
        const currentUser = getCurrentUser();
        const newNoteData = {
            ...note,
            userId: currentUser?.uid,
            createdAt: firestore.Timestamp.now(),
            updatedAt: firestore.Timestamp.now(),
        };

        const newNoteRef = await firestore()
            .collection("notes")
            .add(newNoteData);

        return getNoteById(newNoteRef.id);
    });

export const updateNote = async (
    note: NoteType
): Promise<NoteType | undefined> =>
    performNoteAction(async () => {
        const currentUser = getCurrentUser();
        const newNoteData = {
            ...note,
            userId: currentUser?.uid,
            updatedAt: firestore.Timestamp.now(),
        };
        await firestore().collection("notes").doc(note.id).update(newNoteData);

        return getNoteById(newNoteData.id);
    });

export const deleteNote = async (noteId: string): Promise<void> =>
    performNoteAction(async () => {
        await firestore().collection("notes").doc(noteId).delete();
    });
