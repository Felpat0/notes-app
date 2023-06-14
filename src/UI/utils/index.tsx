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
