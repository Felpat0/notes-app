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
import { useTranslation } from "react-i18next";

export const useNotes = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const getSingleNote = useCallback(
        async (noteId: string): Promise<NoteType | undefined> => {
            return await handleAsyncOperation<NoteType | undefined>(
                () => getNoteById(noteId),
                setLoading,
                setError,
                {
                    error: {
                        title: i18n.t("errors.notes.title"),
                        message: i18n.t("errors.notes.message"),
                    },
                }
            );
        },
        []
    );

    const getAllNotes = useCallback(async (): Promise<NoteType[]> => {
        return await handleAsyncOperation<NoteType[]>(
            getNotes,
            setLoading,
            setError,
            {
                error: {
                    title: i18n.t("errors.notes.title"),
                    message: i18n.t("errors.notes.message"),
                },
            }
        );
    }, []);

    const createNewNote = useCallback(
        async (note?: NoteCreationType): Promise<NoteType> => {
            return await handleAsyncOperation<NoteType>(
                () => createNote(note),
                setLoading,
                setError,
                {
                    error: {
                        title: i18n.t("errors.notes.title"),
                        message: i18n.t("errors.notes.message"),
                    },
                    success: {
                        title: i18n.t("successes.general.title"),
                        message: i18n.t("successes.general.message"),
                    },
                }
            );
        },
        []
    );

    const updateExistingNote = useCallback(
        async (note: NoteType): Promise<NoteType> => {
            return await handleAsyncOperation<NoteType>(
                () => updateNote(note),
                setLoading,
                setError,
                {
                    error: {
                        title: i18n.t("errors.notes.title"),
                        message: i18n.t("errors.notes.message"),
                    },
                }
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
                error: {
                    title: i18n.t("errors.notes.title"),
                    message: i18n.t("errors.notes.message"),
                },
                success: {
                    title: i18n.t("successes.general.title"),
                    message: i18n.t("successes.general.message"),
                },
            }
        );
    }, []);

    const getNoteDropdownOptions = useCallback(
        (note: NoteType) => {
            let options = [];
            if (!note.pinned) {
                options.push({
                    label: t("dropdownMenus.notes.pin"),
                    value: "pin",
                });
            } else {
                options.push({
                    label: t("dropdownMenus.notes.unpin"),
                    value: "unpin",
                });
            }
            options = [
                ...options,
                {
                    label: t("dropdownMenus.notes.delete"),
                    value: "delete",
                },
            ];
            return options;
        },
        [t]
    );

    const handleNoteDropdownItemClick = useCallback(
        (value: string, note: NoteType) => {
            if (!note) return;
            switch (value) {
                case "delete":
                    deleteExistingNote(note.id);
                    break;
                case "pin":
                    updateExistingNote({
                        ...note,
                        pinned: true,
                    });
                    break;
                case "unpin":
                    updateExistingNote({
                        ...note,
                        pinned: false,
                    });
                    break;
                default:
                    break;
            }
        },
        [deleteExistingNote, updateExistingNote]
    );

    return {
        loading,
        error,
        getSingleNote,
        getAllNotes,
        createNewNote,
        updateExistingNote,
        deleteExistingNote,
        getNoteDropdownOptions,
        handleNoteDropdownItemClick,
    };
};
