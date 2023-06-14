import { TextColorVariant, TextVariant } from "../../types/theme";
import { StyleSheet, TextStyle } from "react-native";
import { constants } from "../../config/constants";
import { getDeviceType, getTextColor } from "../../utils";

export const getTextStyle = (
    deviceWidth: number,
    variant: TextVariant = "paragraph",
    colorVariant: TextColorVariant = "primary"
) =>
    StyleSheet.create({
        text: {
            fontSize:
                constants[getDeviceType(deviceWidth)].style.text[variant]
                    .fontSize,
            fontWeight: constants[getDeviceType(deviceWidth)].style.text[
                variant
            ].fontWeight as TextStyle["fontWeight"],
            color: getTextColor(variant, colorVariant),
        },
    });
