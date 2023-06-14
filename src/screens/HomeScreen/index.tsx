import { ScrollView } from "react-native";
import { NoteListElement } from "../../components/Home/NoteListElement";
import { homeScreenStyles } from "./style";
import { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppStack";
import { NoteType } from "../../types/notes";
import { useNotes } from "../../hooks/notes/useNotes";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const { getAllNotes, deleteExistingNote } = useNotes();

    const retrieveNotes = useCallback(async () => {
        const retrievedNotes = await getAllNotes();
        setNotes(retrievedNotes);
    }, []);

    useEffect(() => {
        // Get the notes from the backend
        retrieveNotes();
    }, []);

    const handleNoteClick = useCallback(
        (noteId: string) => {
            navigation.navigate("Note", { noteId });
        },
        [navigation]
    );

    const handleNoteDelete = useCallback(async (noteId: string) => {
        try {
            await deleteExistingNote(noteId);
            retrieveNotes();
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <ScrollView contentContainerStyle={homeScreenStyles.container}>
            {notes.map((note) => (
                <NoteListElement
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    onClick={handleNoteClick}
                    onDelete={handleNoteDelete}
                />
            ))}
        </ScrollView>
    );
};
