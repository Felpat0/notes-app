import React, { useState } from "react";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button } from "../Button";
import { dateToText } from "../../../utils/datetime";

type Props = Omit<React.ComponentProps<typeof DateTimePicker>, "value"> & {
    date: Date;
    mode?: "date" | "time";
    onChange?: (event: DateTimePickerEvent, date: Date) => void;
    disabled?: boolean;
};

export const DatePicker: React.FC<Props> = ({
    date,
    mode = "date",
    onChange,
    disabled = false,
    ...props
}) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button onPress={() => setShow(true)}>
                {date && dateToText(date)}
            </Button>
            {show && ( //@ts-ignore
                <DateTimePicker
                    {...props}
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    //@ts-ignore
                    is24Hour={true}
                    onChange={(event, date) => {
                        date && onChange && onChange(event, date);
                        setShow(false);
                    }}
                    disabled={disabled}
                />
            )}
        </>
    );
};
