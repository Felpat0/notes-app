import { GestureResponderEvent, ScrollView } from "react-native";
import { NoteListElement } from "../../components/Home/NoteListElement";
import { homeScreenStyles } from "./style";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppStack";
import { useNotes } from "../../hooks/notes/useNotes";
import { Greeting } from "../../components/Home/Greeting";
import { getCurrentUser } from "../../firebase/auth";
import { HomeSection } from "../../components/Home/HomeSection";
import { useTranslation } from "react-i18next";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../../UI/theme/colors";
import { isNotePinned } from "../../utils/notes";
import { Card, DropdownMenu } from "../../UI/components";
import { useAppSelector } from "../../redux/store";
import { notesRef } from "../../firebase/notes";
import { useDispatch } from "react-redux";
import { setNotes } from "../../redux/slices/notesSlice";
import { firestoreNoteToNote } from "../../utils/conversions";
import { NoteType, SelectedNoteDataType } from "../../types/notes";
import { Checklist } from "../../components/Checklists/Checklist";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedNoteData, setSelectedNoteData] = useState<
        SelectedNoteDataType | undefined
    >();

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { notes } = useAppSelector((state) => state.notes);
    const {
        createNewNote,
        getNoteDropdownOptions,
        handleNoteDropdownItemClick,
        NotesModals,
    } = useNotes();

    const pinnedNotes = useMemo(() => {
        return notes.filter((note) => isNotePinned(note, currentDate));
    }, [notes, currentDate]);

    useEffect(() => {
        notesRef.onSnapshot((snapshot) => {
            if (snapshot) {
                const notes = snapshot.docs.map((doc) =>
                    firestoreNoteToNote(doc.data())
                );
                dispatch(
                    setNotes({
                        notes: notes.sort(
                            (a, b) =>
                                b.createdAt.getTime() - a.createdAt.getTime()
                        ),
                    })
                );
            }
        });
    }, [dispatch]);

    const handleNewNoteIconPress = useCallback(async () => {
        const newNote = await createNewNote();
        if (newNote)
            navigation.navigate("Note", {
                noteId: newNote.id,
            });
    }, [navigation]);

    const handleNoteClick = useCallback(
        (noteId: string) => {
            navigation.navigate("Note", { noteId });
        },
        [navigation]
    );

    const handlePinnedNoteLongPress = useCallback(
        (event: GestureResponderEvent, note: NoteType) => {
            setSelectedNoteData({
                note,
                x: event.nativeEvent.pageX,
                y: event.nativeEvent.pageY,
            });
        },
        [setSelectedNoteData]
    );

    const handleChecklistDateChange = useCallback(
        (date: Date) => {
            setCurrentDate(date);
        },
        [navigation]
    );

    return (
        <ScrollView contentContainerStyle={homeScreenStyles.container}>
            {NotesModals}
            <Greeting name={getCurrentUser()?.displayName || ""} />
            <Checklist
                date={currentDate}
                onDateChange={handleChecklistDateChange}
            />
            <HomeSection title={t("home.pinnedNotes")}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10 }}
                >
                    {pinnedNotes.map((note) => (
                        <Card
                            key={note.id}
                            title={note.title}
                            onPress={() => handleNoteClick(note.id)}
                            onLongPress={(event) =>
                                handlePinnedNoteLongPress(event, note)
                            }
                        />
                    ))}
                </ScrollView>
            </HomeSection>
            <HomeSection
                title={t("home.notes")}
                icon={
                    <AntDesign name={"plus"} color={colors.white1} size={27} />
                }
                onIconPress={handleNewNoteIconPress}
                containerStyle={{
                    gap: 10,
                }}
            >
                {notes.map((note) => (
                    <NoteListElement
                        key={note.id}
                        note={note}
                        onClick={handleNoteClick}
                    />
                ))}
            </HomeSection>
            {selectedNoteData && (
                <DropdownMenu
                    options={getNoteDropdownOptions(selectedNoteData.note)}
                    onSelect={(value) =>
                        handleNoteDropdownItemClick(
                            value,
                            selectedNoteData.note
                        )
                    }
                    coordinates={{
                        x: selectedNoteData.x,
                        y: selectedNoteData.y,
                    }}
                    forceOptionsOpen={true}
                    onClose={() => setSelectedNoteData(undefined)}
                    hideTrigger
                />
            )}
        </ScrollView>
    );
};
