import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { noteListElementStyles } from "./style";
import { DropdownMenu } from "../../../UI/components/DropdownMenu";
import { useNotes } from "../../../hooks/notes/useNotes";
import { NoteType } from "../../../types/notes";

interface NoteListElementProps {
    note: NoteType;
    subtitle?: string;
    onClick?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const NoteListElement = ({
    note,
    subtitle,
    onClick,
}: NoteListElementProps) => {
    const { getNoteDropdownOptions, handleNoteDropdownItemClick } = useNotes();

    return (
        <TouchableOpacity onPress={() => onClick && onClick(note.id)}>
            <View style={noteListElementStyles.rectangle}>
                <View>
                    <View style={noteListElementStyles.titleContainer}>
                        <Text style={noteListElementStyles.title}>
                            {note.title}
                        </Text>
                    </View>
                    {subtitle && (
                        <Text style={noteListElementStyles.subtitle}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                <DropdownMenu
                    options={getNoteDropdownOptions(note)}
                    position={"left"}
                    onSelect={(value) =>
                        handleNoteDropdownItemClick(value, note)
                    }
                />
            </View>
        </TouchableOpacity>
    );
};
