import { View } from "react-native";
import { noteScreenStyles } from "./style";
import { Input, RichEditor } from "../../UI/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppStack";
import { DropdownMenu } from "../../UI/components/DropdownMenu";
import { useCallback, useEffect, useState } from "react";
import { NoteType } from "../../types/notes";
import { useDebounce } from "../../UI/hooks/useDebounce";
import { constants } from "../../config/constants";
import { useNotes } from "../../hooks/notes/useNotes";

type Props = NativeStackScreenProps<RootStackParamList, "Note">;

export const NoteScreen: React.FC<Props> = ({ route }: Props) => {
    const [note, setNote] = useState<NoteType | undefined>();
    const [currentNote, setCurrentNote] = useState<NoteType | undefined>();
    const { getSingleNote, updateExistingNote } = useNotes();
    const debouncedNote = useDebounce(
        currentNote,
        constants.notesDebounceDelay
    );

    useEffect(() => {
        // Get the current note from the backend, if there is a noteId in the route params
        const retrieveNote = async (noteId: string) => {
            const retrievedNote = await getSingleNote(noteId);
            if (retrievedNote) setNote({ ...retrievedNote });
        };
        if (route.params?.noteId) retrieveNote(route.params.noteId);
    }, [route.params?.noteId]);

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
                    options={[
                        {
                            label: "Save",
                            value: "save",
                        },
                    ]}
                />
            </View>
            <RichEditor
                initialContentHTML={currentNote.content}
                onChange={(content: string) => onChange(content, "content")}
            />
        </View>
    );
};
