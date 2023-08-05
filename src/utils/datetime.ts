import { NoteRecurrenceType } from "../types/notes";

export const dateToText = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const dateToCalendarDateText = (date?: Date) => {
    if (!date) return "";
    const yearString = date.getFullYear().toString();
    const monthString = (date.getMonth() + 1).toString().padStart(2, "0");
    const dateString = date.getDate().toString().padStart(2, "0");

    return `${yearString}-${monthString}-${dateString}`;
};

export const isDateIncludedInRecurrence = (
    date: Date,
    recurrence?: NoteRecurrenceType
): boolean => {
    if (!recurrence) return false;

    switch (recurrence.type) {
        case "punctual":
            return isSameDay(date, recurrence.startDate);
        case "daily":
            return (
                isSameOrAfter(date, recurrence.startDate) &&
                (!recurrence.endDate ||
                    isSameOrBefore(date, recurrence.endDate))
            );
        case "weekly":
            return (
                (recurrence.days?.includes(date.getDay()) &&
                    isSameOrAfter(date, recurrence.startDate) &&
                    (!recurrence.endDate ||
                        isSameOrBefore(date, recurrence.endDate))) ||
                false
            );
        case "monthly":
            return (
                (recurrence.months?.includes(date.getMonth()) &&
                    isSameOrAfter(date, recurrence.startDate) &&
                    (!recurrence.endDate ||
                        isSameOrBefore(date, recurrence.endDate))) ||
                false
            );
        case "yearly":
            return (
                (recurrence.years?.includes(date.getFullYear()) &&
                    isSameOrAfter(date, recurrence.startDate) &&
                    (!recurrence.endDate ||
                        isSameOrBefore(date, recurrence.endDate))) ||
                false
            );
        case "interval":
            return (
                isSameOrAfter(date, recurrence.startDate) &&
                (!recurrence.endDate ||
                    isSameOrBefore(date, recurrence.endDate))
            );
        default:
            return false;
    }
};

function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function isSameOrAfter(date1: Date, date2: Date): boolean {
    return date1.getTime() >= date2.getTime();
}

function isSameOrBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() <= date2.getTime();
}
