import { useState } from "react";
import { NoteCreationType, NoteType } from "../../types/notes";
import {
    createNote,
    updateNote,
    deleteNote,
    getNoteById,
    getNotes,
} from "../../firebase/notes";

export const useNotes = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleAsyncOperation = async (asyncFunction: Function) => {
        setLoading(true);
        setError(null);
        try {
            return await asyncFunction();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getSingleNote = async (noteId: string): Promise<NoteType | null> => {
        return await handleAsyncOperation(() => getNoteById(noteId));
    };

    const getAllNotes = async (): Promise<NoteType[]> => {
        return await handleAsyncOperation(() => getNotes());
    };

    const createNewNote = async (note: NoteCreationType): Promise<NoteType> => {
        return await handleAsyncOperation(() => createNote(note));
    };

    const updateExistingNote = async (note: NoteType): Promise<NoteType> => {
        return await handleAsyncOperation(() => updateNote(note));
    };

    const deleteExistingNote = async (
        noteId: string,
        options?: {
            askForConfirmation?: boolean;
        }
    ) => {
        return await handleAsyncOperation(() => deleteNote(noteId));
    };

    return {
        loading,
        error,
        getSingleNote,
        getAllNotes,
        createNewNote,
        updateExistingNote,
        deleteExistingNote,
    };
};
