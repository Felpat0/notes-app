import { View } from "react-native";
import { ChecklistItemType, ChecklistType } from "../../../types/checklists";
import { ChecklistElement } from "../ChecklistElement";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../../UI/hooks/useDebounce";
import { constants } from "../../../config/constants";
import { useChecklists } from "../../../hooks/checklists/useChecklists";
import { generateUniqueId } from "../../../utils/generic";
import { useTranslation } from "react-i18next";
import { checklistStyles } from "./style";
import { Button, Text } from "../../../UI/components";
import { dateToText } from "../../../utils/datetime";
import { DateSelectionModal } from "../DateSelectionModal";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
    id?: ChecklistType["id"];
    date?: ChecklistType["date"];
    noteId?: ChecklistType["noteId"];
    onDateChange?: (date: Date) => void;
};

const INITIAL_NEW_CHECKLIST_ITEM: ChecklistItemType = {
    id: "new",
    text: "",
    isChecked: false,
};

export const Checklist: React.FC<Props> = ({
    id,
    date,
    noteId,
    onDateChange,
}: Props) => {
    const [currentChecklist, setCurrentChecklist] = useState<ChecklistType>();
    const [newChecklistItem, setNewChecklistItem] = useState<ChecklistItemType>(
        INITIAL_NEW_CHECKLIST_ITEM
    );
    const [showDateSelectionModal, setShowDateSelectionModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();
    const { getSingleChecklist, createNewChecklist, updateExistingChecklist } =
        useChecklists();
    const debouncedChecklist = useDebounce(
        currentChecklist,
        constants.checklistsDebounceDelay
    );

    const init = useCallback(async () => {
        // Get the checklist according to the provided id or date
        if (id) {
            const checklist = await getSingleChecklist("id", id);
            if (checklist) setCurrentChecklist(checklist);
            else {
                const newChecklist = await createNewChecklist({
                    items: [],
                });
                setCurrentChecklist(newChecklist);
            }
        } else if (date) {
            const checklist = await getSingleChecklist("date", date);
            if (checklist) setCurrentChecklist(checklist);
            else {
                const newChecklist = await createNewChecklist({
                    items: [],
                    date,
                });
                setCurrentChecklist(newChecklist);
            }
        } else if (noteId) {
            const checklist = await getSingleChecklist("noteId", noteId);
            if (checklist) setCurrentChecklist(checklist);
            else {
                const newChecklist = await createNewChecklist({
                    items: [],
                    noteId: noteId as string,
                });
                setCurrentChecklist(newChecklist);
            }
        }

        setLoading(false);
    }, [currentChecklist, createNewChecklist, date, loading]);

    // If the checklist has to be created, first create it and then set it as the current checklist
    useEffect(() => {
        if (!currentChecklist && !loading) {
            setLoading(true);
            init();
        }
    }, [currentChecklist, init, loading]);

    // When the date changes, update the checklist
    useEffect(() => {
        if (!currentChecklist || loading) return;
        init();
    }, [date]);

    useEffect(() => {
        // When the debounced checklist changes, save it to the backend
        if (debouncedChecklist) {
            updateExistingChecklist(debouncedChecklist);
        }
    }, [debouncedChecklist]);

    const onChecklistItemChange = useCallback(
        (checklistItem: ChecklistItemType) => {
            if (!currentChecklist) return;

            const newChecklist = {
                ...currentChecklist,
            };

            // If the checklist item is new, add it to the checklist
            if (checklistItem.id === "new") {
                newChecklist.items.push({
                    ...checklistItem,
                    id: generateUniqueId(),
                });
                setCurrentChecklist(newChecklist);
                setNewChecklistItem(INITIAL_NEW_CHECKLIST_ITEM);
                return;
            }
            const checklistItemIndex = currentChecklist.items.findIndex(
                (item) => item.id === checklistItem.id
            );
            newChecklist.items[checklistItemIndex] = checklistItem;

            setCurrentChecklist(newChecklist);
        },
        [currentChecklist]
    );

    const onChecklistItemDelete = useCallback(
        (checklistItem: ChecklistItemType) => {
            if (!currentChecklist) return;

            const newChecklist = {
                ...currentChecklist,
            };

            const checklistItemIndex = currentChecklist.items.findIndex(
                (item) => item.id === checklistItem.id
            );
            newChecklist.items.splice(checklistItemIndex, 1);

            setCurrentChecklist(newChecklist);
        },
        [currentChecklist]
    );

    const onNewChecklistItemChange = useCallback(
        (checklistItem: ChecklistItemType) => {
            setNewChecklistItem({ ...checklistItem, isChecked: false });
        },
        []
    );

    const onDateSelected = useCallback(
        (date: Date) => {
            setShowDateSelectionModal(false);
            onDateChange && onDateChange(date);
        },
        [onDateChange]
    );

    const onDateArrowPress = useCallback(
        (direction: "forward" | "backward") => {
            if (!date) return;
            const newDate = new Date(date);
            if (direction === "forward") newDate.setDate(newDate.getDate() + 1);
            else newDate.setDate(newDate.getDate() - 1);
            onDateChange && onDateChange(newDate);
        },
        [date, onDateChange]
    );

    return (
        <View style={checklistStyles.container}>
            <View style={checklistStyles.titleContainer}>
                <Text variant={"subtitle"}>{t("checklists.title")}</Text>
                {date && (
                    <View style={checklistStyles.titleDateContainer}>
                        <Ionicons
                            name={"caret-back"}
                            size={25}
                            onPress={() => onDateArrowPress("backward")}
                        />
                        <Button onPress={() => setShowDateSelectionModal(true)}>
                            {dateToText(date)}
                        </Button>
                        <Ionicons
                            name={"caret-forward"}
                            size={25}
                            onPress={() => onDateArrowPress("forward")}
                        />
                    </View>
                )}
            </View>
            {currentChecklist?.items.map((item) => (
                <ChecklistElement
                    key={item.id}
                    checklistItem={item}
                    onChange={onChecklistItemChange}
                    onDelete={onChecklistItemDelete}
                />
            ))}
            <ChecklistElement
                checklistItem={newChecklistItem}
                onChange={onNewChecklistItemChange}
                inputProps={{
                    placeholder: t(
                        "inputs.placeholders.checklists.newItemPlaceholder"
                    ),
                    variant: "borderBottom",
                    onSubmitEditing: (event) => {
                        onChecklistItemChange({
                            ...newChecklistItem,
                            text: event.nativeEvent.text,
                        });
                    },
                }}
            />
            {showDateSelectionModal && date && (
                <DateSelectionModal
                    currentDate={date}
                    onChange={onDateSelected}
                />
            )}
        </View>
    );
};
