import { StyleSheet } from "react-native";
import { constants } from "../../config/constants";
import { InputState, InputVariant } from "../../types/theme";
import { getDeviceType, getInputColors } from "../../utils";

export const getInputStyle = (
    deviceWidth: number,
    variant?: InputVariant,
    state?: InputState
) =>
    StyleSheet.create({
        input: {
            borderRadius:
                variant === "borderless"
                    ? 0
                    : constants[getDeviceType(deviceWidth)].style.borderRadius,
            borderBottomWidth: variant === "borderless" ? 2 : 0,
            padding: 10,
            backgroundColor: getInputColors(variant, state).backgroundColor,
            fontSize:
                constants[getDeviceType(deviceWidth)].style.text.paragraph
                    .fontSize,
            fontWeight: "400",
            color: getInputColors(variant, state).color,
            borderColor: getInputColors(variant, state).borderColor,
        },
    });
