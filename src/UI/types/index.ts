export type DeviceType = "mobile" | "tablet" | "desktop";

export type Measure = {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
};

export type DropdownOption = {
    label: string;
    // eslint-disable-next-line
    value: any;
};

export type AlertOptions = {
    /** @platform android */
    cancelable?: boolean | undefined;
    userInterfaceStyle?: "unspecified" | "light" | "dark";
    /** @platform android */
    onDismiss?: (() => void) | undefined;
};
