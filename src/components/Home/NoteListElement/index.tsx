import React, { useCallback, useMemo } from "react";
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
    onDelete,
}: NoteListElementProps) => {
    const { updateExistingNote } = useNotes();

    const dropdownOptions = useMemo(() => {
        let options = [];
        if (!note.pinned) {
            options.push({
                label: "Pin",
                value: "pin",
            });
        } else {
            options.push({
                label: "Unpin",
                value: "unpin",
            });
        }
        options = [
            ...options,
            {
                label: "Delete",
                value: "delete",
            },
        ];
        return options;
    }, [note.pinned]);

    const handleDropdownMenuSelect = useCallback(
        async (value: string) => {
            switch (value) {
                case "delete":
                    onDelete && onDelete(note.id);
                    break;
                case "pin":
                    await updateExistingNote({
                        ...note,
                        pinned: true,
                    });
                    break;
                case "unpin":
                    await updateExistingNote({
                        ...note,
                        pinned: false,
                    });
                    break;
                default:
                    break;
            }
        },
        [onDelete]
    );

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
                    options={dropdownOptions}
                    position={"left"}
                    onSelect={handleDropdownMenuSelect}
                />
            </View>
        </TouchableOpacity>
    );
};
