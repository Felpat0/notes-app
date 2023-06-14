import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { noteListElementStyles } from "./style";
import { DropdownMenu } from "../../../UI/components/DropdownMenu";

interface NoteListElementProps {
    id: string;
    title: string;
    subtitle?: string;
    onClick?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const NoteListElement = ({
    id,
    title,
    subtitle,
    onClick,
    onDelete,
}: NoteListElementProps) => {
    const handleDropdownMenuSelect = useCallback(
        async (value: string) => {
            switch (value) {
                case "delete":
                    onDelete && onDelete(id);
                    break;
                default:
                    break;
            }
        },
        [onDelete]
    );

    return (
        <TouchableOpacity onPress={() => onClick && onClick(id)}>
            <View style={noteListElementStyles.rectangle}>
                <View>
                    <View style={noteListElementStyles.titleContainer}>
                        <Text style={noteListElementStyles.title}>{title}</Text>
                    </View>
                    {subtitle && (
                        <Text style={noteListElementStyles.subtitle}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                <DropdownMenu
                    options={[
                        {
                            label: "Delete",
                            value: "delete",
                        },
                    ]}
                    position={"left"}
                    onSelect={handleDropdownMenuSelect}
                />
            </View>
        </TouchableOpacity>
    );
};
