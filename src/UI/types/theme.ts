import { ButtonProps } from "../components/Button";
import { ModalProps } from "../components/Modal";

export type ThemeType = "dark" | "light";

export type TextVariant = "title" | "subtitle" | "paragraph";
export type TextColorVariant = "primary" | "secondary";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "borderless";
export type ButtonState = "idle" | "hover" | "disabled";
export type ButtonSize = "small" | "medium" | "large";

export type InputVariant = "default" | "borderBottom" | "borderless";
export type InputState = "idle" | "focused" | "disabled";
export type InputSize = "small" | "medium" | "large";

export type CheckboxVariant = "default";
export type CheckboxState = "idle" | "hover" | "disabled";
export type CheckboxSize = "small" | "medium" | "large";

export type CardVariant = "default";
export type CardSize = "small" | "medium" | "large";

export type ModalVariant = "default";
export type ModalSize = "small" | "medium" | "large" | "auto";

export type AlertVariant = "default";
export type AlertSize = "small" | "medium" | "large" | "auto";

export type CalendarVariant = "default";

export type AlertType = {
    id: number;
    title?: string;
    message: string;
    type?: "success" | "error" | "warning" | "info";
    isOpen?: boolean;
    onClose?: () => void;
    actions?: ActionType[];
    modalProps?: ModalProps;
};

export type AlertTypePayload = Omit<AlertType, "id">;

export type ActionType = ButtonProps & {
    label: string;
};
