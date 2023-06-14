import { actions } from "react-native-pell-rich-editor";

export const constants = {
    breakpoints: {
        mobile: 320,
        tablet: 768,
        desktop: 1024,
    },
    richEditorToolbarActions: [
        actions.removeFormat,
        actions.undo,
        actions.redo,
        actions.setBold,
        actions.setItalic,
        actions.heading1,
        actions.heading2,
        actions.insertBulletsList,
        actions.insertOrderedList,
        actions.insertLink,
        actions.checkboxList,
        actions.setStrikethrough,
        actions.insertImage,
    ],
    mobile: {
        style: {
            borderRadius: 12,
            text: {
                title: {
                    fontSize: 28,
                    fontWeight: "700",
                },
                subtitle: {
                    fontSize: 24,
                    fontWeight: "600",
                },
                paragraph: {
                    fontSize: 13,
                    fontWeight: "400",
                },
            },
        },
        size: {
            button: {
                small: { height: 30 },
                medium: { height: 40 },
                large: { height: 50 },
            },
            input: {
                small: { height: 30 },
                medium: { height: 40 },
                large: { height: 50 },
            },
            checkbox: {
                small: { height: 15, width: 15 },
                medium: { height: 20, width: 20 },
                large: { height: 25, width: 25 },
            },
            card: {
                small: { width: 220, height: 120 },
                medium: {
                    width: 300,
                    height: 150,
                },
                large: {
                    width: 400,
                    height: 200,
                },
            },
            modal: {
                small: { width: 300, height: 180, fontSize: 14 },
                medium: {
                    width: 400,
                    height: 220,
                    fontSize: 14,
                },
                large: {
                    width: 500,
                    height: 260,
                    fontSize: 14,
                },
                auto: {
                    width: "90%",
                    height: undefined,
                    fontSize: 14,
                },
            },
        },
    },
    tablet: {
        style: {
            borderRadius: 12,
            text: {
                title: {
                    fontSize: 28,
                    fontWeight: "700",
                },
                subtitle: {
                    fontSize: 24,
                    fontWeight: "600",
                },
                paragraph: {
                    fontSize: 13,
                    fontWeight: "400",
                },
            },
        },
        size: {
            button: {
                small: { height: 30 },
                medium: { height: 40 },
                large: { height: 50 },
            },
            input: {
                small: { height: 30 },
                medium: { height: 40 },
                large: { height: 50 },
            },
            checkbox: {
                small: { height: 10, width: 10 },
                medium: { height: 15, width: 15 },
                large: { height: 20, width: 20 },
            },
            card: {
                small: { width: 220, height: 120 },
                medium: {
                    width: 300,
                    height: 150,
                },
                large: {
                    width: 400,
                    height: 200,
                },
            },
            modal: {
                small: { width: 400, height: 220, fontSize: 14 },
                medium: {
                    width: 500,
                    height: 260,
                    fontSize: 14,
                },
                large: {
                    width: 600,
                    height: 300,
                    fontSize: 14,
                },
                auto: {
                    width: "90%",
                    height: undefined,
                    fontSize: 14,
                },
            },
        },
    },
    desktop: {
        style: {
            borderRadius: 12,
            text: {
                title: {
                    fontSize: 28,
                    fontWeight: "700",
                },
                subtitle: {
                    fontSize: 24,
                    fontWeight: "600",
                },
                paragraph: {
                    fontSize: 13,
                    fontWeight: "400",
                },
            },
        },
        size: {
            button: {
                small: { height: 30 },
                medium: { height: 40 },
                large: { height: 50 },
            },
            input: {
                small: { height: 30 },
                medium: { height: 40 },
                large: { height: 50 },
            },
            checkbox: {
                small: { height: 10, width: 10 },
                medium: { height: 15, width: 15 },
                large: { height: 20, width: 20 },
            },
            card: {
                small: { width: 220, height: 120 },
                medium: {
                    width: 300,
                    height: 150,
                },
                large: {
                    width: 400,
                    height: 200,
                },
            },
            modal: {
                small: { width: 600, height: 300 },
                medium: {
                    width: 800,
                    height: 500,
                    fontSize: 14,
                },
                large: {
                    width: 1000,
                    height: 700,
                    fontSize: 14,
                },
                auto: {
                    width: "90%",
                    height: undefined,
                    fontSize: 14,
                },
            },
        },
    },
};
