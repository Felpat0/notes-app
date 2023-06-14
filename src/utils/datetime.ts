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
