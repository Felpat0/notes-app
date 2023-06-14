import { constants } from "../../config/constants";
import { StyleSheet } from "react-native";
import { getCheckboxColors, getDeviceType } from "../../utils";
import {
    CheckboxVariant,
    CheckboxState,
    CheckboxSize,
} from "../../types/theme";

export const checkboxStyle = (
    deviceWidth: number,
    variant?: CheckboxVariant,
    state?: CheckboxState,
    size?: CheckboxSize
) =>
    StyleSheet.create({
        container: {
            alignItems: "center",
            flexDirection: "row",
        },
        checkbox: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            minWidth:
                constants[getDeviceType(deviceWidth)].size.checkbox[size].width,
            minHeight:
                constants[getDeviceType(deviceWidth)].size.checkbox[size]
                    .height,
            maxWidth:
                constants[getDeviceType(deviceWidth)].size.checkbox[size].width,
            maxHeight:
                constants[getDeviceType(deviceWidth)].size.checkbox[size]
                    .height,
            backgroundColor: getCheckboxColors(variant, state).backgroundColor,
        },
        text: {
            fontSize:
                constants[getDeviceType(deviceWidth)].style.text.paragraph
                    .fontSize,
            fontWeight: "500",
            color: getCheckboxColors(variant, state).color,
            marginLeft: 5,
        },
    });
