import { StyleSheet } from "react-native";
import { constants } from "../../config/constants";
import { getDeviceType } from "../../utils";

export const getCalendarStyle = (deviceWidth: number) =>
    StyleSheet.create({
        calendar: {
            borderRadius:
                constants[getDeviceType(deviceWidth)].style.borderRadius,
        },
    });
