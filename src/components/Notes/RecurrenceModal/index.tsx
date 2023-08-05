import { useTranslation } from "react-i18next";
import { Modal, ModalProps } from "../../../UI/components/Modal";
import { NoteRecurrenceType, NoteType } from "../../../types/notes";
import { Button, DatePicker, Text } from "../../../UI/components";
import { Picker } from "../../../UI/components/Picker";
import { useCallback, useState } from "react";
import { recurrenceModalStyles } from "./style";
import { View } from "react-native";

type Props = ModalProps & {
    note: NoteType;
    onSave?: (recurrence?: NoteRecurrenceType) => void;
    onCancel?: () => void;
};

export const RecurrenceModal = ({
    note,
    onSave,
    onCancel,
    ...props
}: Props) => {
    const { t } = useTranslation();
    const [currentRecurrence, setCurrentRecurrence] = useState<
        NoteRecurrenceType | undefined
    >(note.recurrence || undefined);

    const handleInputChange = (
        value: NoteRecurrenceType[keyof NoteRecurrenceType] | "none",
        type: keyof NoteRecurrenceType
    ) => {
        switch (type) {
            case "type":
                if (value === "none") {
                    setCurrentRecurrence(undefined);
                    return;
                }
                break;
            case "startDate":
                if (!value)
                    setCurrentRecurrence((prev) => ({
                        ...prev,
                        type: prev?.type || "punctual",
                        startDate: new Date(),
                    }));
                setCurrentRecurrence((prev) => ({
                    ...prev,
                    type: prev?.type || "punctual",
                    startDate: value as NoteRecurrenceType["startDate"],
                }));
                return;
            default:
                break;
        }

        setCurrentRecurrence((prev) => {
            return {
                ...prev,
                type: prev?.type || "punctual",
                startDate: prev?.startDate || new Date(),
                [type]: value,
            };
        });
    };

    const renderInputs = useCallback(
        (currentRecurrence: NoteRecurrenceType) => {
            switch (currentRecurrence.type) {
                case "punctual": {
                    return (
                        <View style={[recurrenceModalStyles.punctualContainer]}>
                            <Text>
                                {t("recurrence.punctualRecurrenceDate")}
                            </Text>
                            <DatePicker
                                date={currentRecurrence.startDate}
                                onChange={(event, date) =>
                                    handleInputChange(date, "startDate")
                                }
                            />
                        </View>
                    );
                }
                default:
                    return null;
            }
        },
        []
    );

    const handleSave = useCallback(() => {
        onSave && onSave(currentRecurrence);
    }, [currentRecurrence]);

    const handleCancel = useCallback(() => {
        onCancel && onCancel();
    }, []);

    return (
        <Modal title={t("modals.recurrenceModal.title")} {...props}>
            <Text>{t("modals.recurrenceModal.setNoteRecurrence")}</Text>
            <Picker
                selectedValue={currentRecurrence?.type}
                onValueChange={(value) =>
                    handleInputChange(
                        value as NoteRecurrenceType["type"],
                        "type"
                    )
                }
                options={[
                    {
                        label: t("recurrence.none"),
                        value: "none",
                    },
                    {
                        label: t("recurrence.punctual"),
                        value: "punctual",
                    },
                ]}
            />
            {currentRecurrence && renderInputs(currentRecurrence)}
            <View style={recurrenceModalStyles.footer}>
                <Button variant={"borderless"} onPress={handleCancel}>
                    {t("ui.buttons.cancel")}
                </Button>
                <Button onPress={handleSave}>{t("ui.buttons.save")}</Button>
            </View>
        </Modal>
    );
};
