import { useState, useCallback } from "react";
import { Button, Calendar, Modal } from "../../../UI/components";
import { useTranslation } from "react-i18next";

type Props = {
    currentDate: Date;
    onChange?: (date: Date) => void;
};

export const DateSelectionModal: React.FC<Props> = ({
    currentDate,
    onChange,
}: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
    const { t } = useTranslation();

    const handleDateChange = useCallback((date?: Date) => {
        if (date) setSelectedDate(date);
    }, []);

    const handleSave = useCallback(() => {
        onChange && onChange(selectedDate);
    }, [onChange, selectedDate]);

    return (
        <Modal title={t("modals.dateSelectionModal.title")} visible={true}>
            <Calendar selectedDate={selectedDate} onChange={handleDateChange} />
            <Button width={"100%"} onPress={handleSave}>
                {t("buttons.ok")}
            </Button>
        </Modal>
    );
};
