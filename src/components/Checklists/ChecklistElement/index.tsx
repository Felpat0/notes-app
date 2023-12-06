import {
    NativeSyntheticEvent,
    TextInputChangeEventData,
    View,
} from "react-native";
import { Checkbox, Input } from "../../../UI/components";
import { ChecklistItemType } from "../../../types/checklists";
import { useCallback } from "react";
import { InputProps } from "../../../UI/components/Input";
import { checklistElementStyles } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
    checklistItem: ChecklistItemType;
    onChange?: (checklistItem: ChecklistItemType) => void;
    onDelete?: (checklistItem: ChecklistItemType) => void;
    inputProps?: InputProps;
};

export const ChecklistElement: React.FC<Props> = ({
    checklistItem,
    onChange,
    onDelete,
    inputProps,
}: Props) => {
    const handleChecklistItemPress = useCallback(
        (checked: boolean) => {
            onChange &&
                onChange({
                    ...checklistItem,
                    isChecked: checked,
                });
        },
        [checklistItem, onChange]
    );

    const handleTextChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            onChange &&
                onChange({
                    ...checklistItem,
                    text: event.nativeEvent.text,
                });
        },
        [checklistItem, onChange]
    );

    return (
        <View style={checklistElementStyles.container}>
            <Checkbox
                checked={checklistItem.isChecked}
                onChange={handleChecklistItemPress}
            />
            <Input
                variant={"borderless"}
                style={[
                    checklistElementStyles.input,
                    {
                        textDecorationLine: checklistItem.isChecked
                            ? "line-through"
                            : "none",
                    },
                ]}
                onChange={handleTextChange}
                {...inputProps}
            >
                {checklistItem.text}
            </Input>
            {onDelete && (
                <Ionicons
                    name={"trash"}
                    size={25}
                    onPress={() => onDelete(checklistItem)}
                />
            )}
        </View>
    );
};
