import React, { useState } from "react";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button } from "../Button";
import { dateToText } from "../../../utils/datetime";

type Props = {
    date: Date;
    mode?: "date" | "time";
    onChange?: (event: DateTimePickerEvent, date: Date) => void;
};

export const DatePicker: React.FC<Props> = ({
    date,
    mode = "date",
    onChange,
}) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button onPress={() => setShow(true)}>
                {date && dateToText(date)}
            </Button>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={(event, date) => {
                        date && onChange && onChange(event, date);
                        setShow(false);
                    }}
                />
            )}
        </>
    );
};
