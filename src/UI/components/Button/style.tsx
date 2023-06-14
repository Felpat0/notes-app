import { constants } from "../../config/constants";
import { StyleSheet } from "react-native";
import { getButtonColors, getDeviceType } from "../../utils";
import { ButtonVariant, ButtonState } from "../../types/theme";

export const buttonStyle = (
    deviceWidth: number,
    variant?: ButtonVariant,
    state?: ButtonState
) =>
    StyleSheet.create({
        button: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius:
                constants[getDeviceType(deviceWidth)].style.borderRadius,
            padding: 10,
            backgroundColor: getButtonColors(variant, state).backgroundColor,
        },
        text: {
            fontSize:
                constants[getDeviceType(deviceWidth)].style.text.paragraph
                    .fontSize,
            fontWeight: "500",
            color: getButtonColors(variant, state).color,
        },
    });
