import { ScrollView } from "react-native";
import { NoteListElement } from "../../components/Home/NoteListElement";
import { homeScreenStyles } from "./style";
import { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppStack";
import { NoteType } from "../../types/notes";
import { useNotes } from "../../hooks/notes/useNotes";
import { Greeting } from "../../components/Home/Greeting";
import { getCurrentUser } from "../../firebase/auth";
import { HomeSection } from "../../components/Home/HomeSection";
import { useTranslation } from "react-i18next";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../../UI/theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
    const { t } = useTranslation();
    const { getAllNotes, deleteExistingNote } = useNotes();
    const [notes, setNotes] = useState<NoteType[]>([]);

    const retrieveNotes = useCallback(async () => {
        const retrievedNotes = await getAllNotes();
        setNotes(retrievedNotes);
    }, []);

    useEffect(() => {
        // Get the notes from the backend
        retrieveNotes();
    }, []);

    const handleNewNoteIconPress = useCallback(() => {
        navigation.navigate("Note", {});
    }, [navigation]);

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
            <Greeting name={getCurrentUser()?.displayName || ""} />
            <HomeSection
                title={t("home.notes")}
                icon={
                    <AntDesign name={"plus"} color={colors.white1} size={27} />
                }
                onIconPress={handleNewNoteIconPress}
            >
                {notes.map((note) => (
                    <NoteListElement
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        onClick={handleNoteClick}
                        onDelete={handleNoteDelete}
                    />
                ))}
            </HomeSection>
        </ScrollView>
    );
};
