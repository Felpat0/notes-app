import { StyleSheet } from "react-native";
import { constants } from "../../config/constants";
import { ModalSize, ModalVariant } from "../../types/theme";
import { getDeviceType, getModalColors, getModalSize } from "../../utils";
import { colors } from "../../theme/colors";

export const getModalStyle = (
    deviceWidth: number,
    variant: ModalVariant = "default",
    size: ModalSize = "auto"
) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            borderRadius:
                constants[getDeviceType(deviceWidth)].style.borderRadius,
            width: getModalSize(size, deviceWidth).width,
            height: getModalSize(size, deviceWidth).height,
            backgroundColor: getModalColors(variant).backgroundColor,
            color: getModalColors(variant).color,
            padding: 10,
        },
        title: {},
    });
