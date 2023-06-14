import { DateData, Calendar as RNCalendar } from "react-native-calendars";
import React, { useCallback } from "react";
import { dateToCalendarDateText } from "../../../utils/datetime";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleProp, ViewStyle } from "react-native/types";
import { useWindowDimensions } from "react-native";
import { getCalendarStyle } from "./style";
import { CalendarVariant } from "../../types/theme";
import { getCalendarTheme } from "../../utils";

type Props = {
    selectedDate?: Date;
    onChange?: (date: Date) => void;
    style?: StyleProp<ViewStyle>;
    calendarVariant?: CalendarVariant;
    datesToMark?: Date[];
};

export const Calendar: React.FC<Props> = ({
    selectedDate,
    onChange,
    style,
    calendarVariant = "default",
    datesToMark = [],
}) => {
    const dimensions = useWindowDimensions();

    const handleChange = useCallback((dateData: DateData) => {
        if (onChange) {
            onChange(new Date(dateData.dateString));
        }
    }, []);

    return (
        <RNCalendar
            onDayPress={handleChange}
            markedDates={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...datesToMark.reduce((acc: any, date) => {
                    acc[dateToCalendarDateText(date)] = {
                        marked: true,
                        selectedDotColor:
                            getCalendarTheme(calendarVariant).dotColor,
                    };

                    return acc;
                }, {}),
                [dateToCalendarDateText(selectedDate)]: {
                    selected: true,
                    selectedColor:
                        getCalendarTheme(calendarVariant)
                            .selectedDayBackgroundColor,
                    selectedTextColor:
                        getCalendarTheme(calendarVariant).selectedDayTextColor,
                },
            }}
            renderArrow={(direction) => {
                if (direction === "left")
                    return <FontAwesome name="arrow-left" color={"white"} />;
                if (direction === "right")
                    return <FontAwesome name="arrow-right" color={"white"} />;
            }}
            theme={getCalendarTheme(calendarVariant)}
            style={[getCalendarStyle(dimensions.width).calendar, style]}
        />
    );
};
