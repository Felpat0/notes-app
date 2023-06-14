export const colors = {
    skyblue1: "#7CDEDC",
    blue1: "#090622",
    blue2: "#120f2b",
    blue3: "#006494",
    blue4: "#025076",
    purple1: "#A9B3CE",
    purple2: "#944BBB",
    purple3: "#7284A8",
    purple4: "#662C85",
    white1: "#FFFFFF",
    white2: "#e2e2e2",
    black1: "#121212",
    black2: "#262626",
    transparent: "transparent",
};

export const themeColors = {
    background: {
        primary: colors.blue1,
    },
    text: {
        title: {
            primary: colors.white1,
            secondary: colors.blue1,
        },
        subtitle: {
            primary: colors.white1,
            secondary: colors.blue1,
        },
        paragraph: {
            primary: colors.white1,
            secondary: colors.blue1,
        },
    },
    button: {
        primary: {
            idle: {
                color: colors.white1,
                backgroundColor: colors.blue3,
            },
            hover: {
                color: colors.white1,
                backgroundColor: colors.blue4,
            },
            disabled: {
                color: colors.white1,
                backgroundColor: colors.blue2,
            },
        },
        secondary: {
            idle: {
                color: colors.white1,
                backgroundColor: colors.blue3,
            },
            hover: {
                color: colors.white1,
                backgroundColor: colors.blue4,
            },
            disabled: {
                color: colors.white1,
                backgroundColor: colors.blue2,
            },
        },
        tertiary: {
            idle: {
                color: colors.white1,
                backgroundColor: colors.blue3,
            },
            hover: {
                color: colors.white1,
                backgroundColor: colors.blue4,
            },
            disabled: {
                color: colors.white1,
                backgroundColor: colors.blue2,
            },
        },
    },
    input: {
        default: {
            idle: {
                color: colors.blue1,
                backgroundColor: colors.purple1,
                placeholderColor: colors.purple3,
                borderColor: colors.transparent,
            },
            hover: {
                color: colors.blue1,
                backgroundColor: colors.purple1,
                placeholderColor: colors.purple3,
                borderColor: colors.transparent,
            },
            disabled: {
                color: colors.blue1,
                backgroundColor: colors.purple1,
                placeholderColor: colors.purple3,
                borderColor: colors.transparent,
            },
        },
        borderless: {
            idle: {
                color: colors.white1,
                backgroundColor: colors.transparent,
                placeholderColor: colors.purple1,
                borderColor: colors.purple2,
            },
            hover: {
                color: colors.white1,
                backgroundColor: colors.transparent,
                placeholderColor: colors.purple1,
                borderColor: colors.purple2,
            },
            disabled: {
                color: colors.white2,
                backgroundColor: colors.transparent,
                placeholderColor: colors.purple1,
                borderColor: colors.purple2,
            },
        },
    },
    checkbox: {
        default: {
            idle: {
                color: colors.white1,
                backgroundColor: colors.purple2,
                borderColor: colors.purple4,
            },
            hover: {
                color: colors.white1,
                backgroundColor: colors.purple2,
                borderColor: colors.purple4,
            },
            disabled: {
                color: colors.white1,
                backgroundColor: colors.purple2,
                borderColor: colors.purple4,
            },
        },
    },
    modal: {
        default: {
            color: colors.white1,
            backgroundColor: colors.black1,
        },
    },
    calendar: {
        default: {
            monthTextColor: colors.white1,
            calendarBackground: colors.black2,
            selectedDayBackgroundColor: colors.purple2,
            selectedDayTextColor: colors.white1,
            todayTextColor: colors.purple2,
            dayTextColor: colors.white1,
            textDisabledColor: colors.purple3,
            textDayFontWeight: "600" as "600",
            dotColor: colors.skyblue1,
        },
    },
};
