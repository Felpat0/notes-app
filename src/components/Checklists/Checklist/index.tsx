import { View } from "react-native";
import { ChecklistItemType, ChecklistType } from "../../../types/checklists";
import { ChecklistElement } from "../ChecklistElement";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../../UI/hooks/useDebounce";
import { constants } from "../../../config/constants";
import { useChecklists } from "../../../hooks/checklists/useChecklists";
import { generateUniqueId } from "../../../utils/generic";
import { useTranslation } from "react-i18next";

type Props = {
    id?: ChecklistType["id"];
    date?: ChecklistType["date"];
};

const INITIAL_NEW_CHECKLIST_ITEM: ChecklistItemType = {
    id: "new",
    text: "",
    isChecked: false,
};

export const Checklist: React.FC<Props> = ({ id, date }: Props) => {
    const [currentChecklist, setCurrentChecklist] = useState<ChecklistType>();
    const [newChecklistItem, setNewChecklistItem] = useState<ChecklistItemType>(
        INITIAL_NEW_CHECKLIST_ITEM
    );
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();
    const { getSingleChecklist, createNewChecklist, updateExistingChecklist } =
        useChecklists();
    const debouncedChecklist = useDebounce(
        currentChecklist,
        constants.checklistsDebounceDelay
    );

    // If the checklist has to be created, first create it and then set it as the current checklist
    useEffect(() => {
        const init = async () => {
            // Get the checklist according to the provided id or date
            if (id) {
                const checklist = await getSingleChecklist(id);
                if (checklist) setCurrentChecklist(checklist);
                else {
                    const newChecklist = await createNewChecklist({
                        items: [],
                    });
                    setCurrentChecklist(newChecklist);
                }
            } else if (date) {
                const checklist = await getSingleChecklist(date);
                if (checklist) setCurrentChecklist(checklist);
                else {
                    const newChecklist = await createNewChecklist({
                        items: [],
                        date,
                    });
                    setCurrentChecklist(newChecklist);
                }
            }

            setLoading(false);
        };

        if (!currentChecklist && !loading) {
            setLoading(true);
            init();
        }
    }, [currentChecklist, createNewChecklist, loading]);

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
            setNewChecklistItem(checklistItem);
        },
        []
    );

    return (
        <View>
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
        </View>
    );
};
