import { View } from "react-native";
import { noteScreenStyles } from "./style";
import { Input, RichEditor } from "../../UI/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppStack";
import { DropdownMenu } from "../../UI/components/DropdownMenu";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NoteType } from "../../types/notes";
import { useDebounce } from "../../UI/hooks/useDebounce";
import { constants } from "../../config/constants";
import { useNotes } from "../../hooks/notes/useNotes";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/store";

type Props = NativeStackScreenProps<RootStackParamList, "Note">;

export const NoteScreen: React.FC<Props> = ({ route }: Props) => {
    const { t } = useTranslation();
    const { notes } = useAppSelector((state) => state.notes);
    const [currentNote, setCurrentNote] = useState<NoteType | undefined>();
    const { updateExistingNote, deleteExistingNote } = useNotes();

    const note = useMemo(() => {
        return notes.find((note) => note.id === route.params?.noteId);
    }, [notes, route.params?.noteId]);

    const debouncedNote = useDebounce(
        currentNote,
        constants.notesDebounceDelay
    );

    useEffect(() => {
        // When the note is retrieved from the backend, set it as the current note
        if (note) setCurrentNote({ ...note });
    }, [note]);

    useEffect(() => {
        // When the debounced note changes, save it to the backend
        if (debouncedNote) {
            updateExistingNote(debouncedNote);
        }
    }, [debouncedNote]);

    const dropdownOptions = useMemo(() => {
        let options = [];
        if (!note?.pinned) {
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
    }, [note]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = useCallback((newValue: any, field: keyof NoteType) => {
        setCurrentNote((currentNote) => {
            if (!currentNote) return currentNote;
            return {
                ...currentNote,
                [field]: newValue,
            };
        });
    }, []);

    const handleDropdownItemClick = useCallback(
        (value: string) => {
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
        [deleteExistingNote, note]
    );

    if (!currentNote) return <View></View>;

    return (
        <View style={noteScreenStyles.container}>
            <View style={noteScreenStyles.titleContainer}>
                <Input
                    value={currentNote.title}
                    onChangeText={(value) => onChange(value, "title")}
                    placeholder="Title"
                    variant={"borderless"}
                    style={noteScreenStyles.titleInput}
                />
                <DropdownMenu
                    options={dropdownOptions}
                    onSelect={handleDropdownItemClick}
                />
            </View>
            <RichEditor
                initialContentHTML={currentNote.content}
                onChange={(content: string) => onChange(content, "content")}
            />
        </View>
    );
};
