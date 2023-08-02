import { useCallback, useState } from "react";
import { NoteCreationType, NoteType } from "../../types/notes";
import {
    createNote,
    updateNote,
    deleteNote,
    getNoteById,
    getNotes,
} from "../../firebase/notes";
import { handleAsyncOperation } from "../../UI/utils";
import i18n from "../../localization/i18n";

export const useNotes = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const getSingleNote = useCallback(
        async (noteId: string): Promise<NoteType | undefined> => {
            return await handleAsyncOperation<NoteType | undefined>(
                () => getNoteById(noteId),
                setLoading,
                setError
            );
        },
        []
    );

    const getAllNotes = useCallback(async (): Promise<NoteType[]> => {
        return await handleAsyncOperation<NoteType[]>(() => getNotes());
    }, []);

    const createNewNote = useCallback(
        async (note?: NoteCreationType): Promise<NoteType> => {
            return await handleAsyncOperation<NoteType>(
                () => createNote(note),
                setLoading,
                setError
            );
        },
        []
    );

    const updateExistingNote = useCallback(
        async (note: NoteType): Promise<NoteType> => {
            return await handleAsyncOperation<NoteType>(
                () => updateNote(note),
                setLoading,
                setError
            );
        },
        []
    );

    const deleteExistingNote = useCallback(async (noteId: string) => {
        return await handleAsyncOperation(
            () => deleteNote(noteId),
            setLoading,
            setError,
            {
                confirmation: {
                    title: i18n.t("alerts.deleteNote.title"),
                    message: i18n.t("alerts.deleteNote.message"),
                },
            }
        );
    }, []);

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
