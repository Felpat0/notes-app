import { openConfirmationAlert } from "../components/Alert/instantiators";
import { constants } from "../config/constants";
import { themeColors } from "../theme/colors";
import { DeviceType } from "../types";
import {
    ButtonSize,
    ButtonState,
    ButtonVariant,
    CalendarVariant,
    CheckboxSize,
    CheckboxState,
    CheckboxVariant,
    InputSize,
    InputState,
    InputVariant,
    ModalSize,
    ModalVariant,
    TextColorVariant,
    TextVariant,
} from "../types/theme";

// Text
export const getTextColor = (
    textVariant: TextVariant = "paragraph",
    textColorVariant: TextColorVariant = "primary"
) => {
    return themeColors.text[textVariant][textColorVariant];
};

// Button
export const getButtonColors = (
    buttonVariant: ButtonVariant = "primary",
    buttonState: ButtonState = "idle"
) => {
    return themeColors.button[buttonVariant][buttonState];
};
export const getButtonSize = (
    size: ButtonSize = "medium",
    deviceWidth: number
) => {
    return constants[getDeviceType(deviceWidth)].size.button[size];
};

// Input
export const getInputColors = (
    inputVariant: InputVariant = "default",
    inputState: InputState = "idle"
) => {
    return themeColors.input[inputVariant][inputState];
};
export const getInputSize = (
    inputSize: InputSize = "medium",
    deviceWidth: number
) => {
    return constants[getDeviceType(deviceWidth)].size.input[inputSize];
};

// Checkbox
export const getCheckboxColors = (
    checkboxVariant: CheckboxVariant = "default",
    checkboxState: CheckboxState = "idle"
) => {
    return themeColors.checkbox[checkboxVariant][checkboxState];
};
export const getCheckboxSize = (
    checkboxSize: CheckboxSize = "medium",
    deviceWidth: number
) => {
    return constants[getDeviceType(deviceWidth)].size.checkbox[checkboxSize];
};

// Modal
export const getModalSize = (modalSize: ModalSize, deviceWidth: number) => {
    return constants[getDeviceType(deviceWidth)].size.modal[modalSize];
};

export const getModalColors = (modalVariant: ModalVariant) => {
    return themeColors.modal[modalVariant];
};

// Calendar
export const getCalendarTheme = (calendarVariant: CalendarVariant) => {
    return themeColors.calendar[calendarVariant];
};

// Misc
export const handleAsyncOperation = async <T,>(
    asyncFunction: () => Promise<T>,
    setLoading?: (loading: boolean) => void,
    setError?: (error?: string) => void,
    options?: {
        confirmationMessage?: string;
    }
): Promise<T> => {
    const executeFunction = async () => {
        setLoading && setLoading(true);
        setError && setError(undefined);
        try {
            const result = await asyncFunction();
            setLoading && setLoading(false);
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError && setError(error.message);
            setLoading && setLoading(false);
            throw error;
        }
    };

    // If there is a confirmation message, show the confirmation alert and execute the function if the user confirms
    if (options?.confirmationMessage) {
        return new Promise((resolve, reject) => {
            openConfirmationAlert(
                {
                    message: options.confirmationMessage || "",
                },
                () => {
                    resolve(executeFunction());
                },
                () => reject("User cancelled the operation")
            );
        });
    }
    // Otherwise, execute the function
    return executeFunction();
};

// Function that returns if the device type based on the screen width and the breakpoints
export const getDeviceType = (width: number): DeviceType => {
    if (width < constants.breakpoints.tablet) {
        return "mobile";
    } else if (width < constants.breakpoints.desktop) {
        return "tablet";
    } else {
        return "desktop";
    }
};
