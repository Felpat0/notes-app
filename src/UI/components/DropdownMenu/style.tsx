import { StyleSheet } from "react-native";
import { themeColors } from "../../theme/colors";
import { constants } from "../../config/constants";
import { getDeviceType } from "../../utils";
import { Measure } from "../../types";

export const getDropdownMenuStyles = (
    position: "left" | "right",
    deviceWidth: number,
    measure?: Measure
) =>
    StyleSheet.create({
        options: {
            position: "absolute",
            width: 200,
            top: measure?.pageY,
            right:
                position === "left"
                    ? deviceWidth -
                      (measure?.pageX || 0) -
                      (measure?.width || 0)
                    : undefined,
            left: position === "right" ? measure?.pageX : undefined,
            backgroundColor: "#1a1a1a",
            borderRadius:
                constants[getDeviceType(deviceWidth) as keyof typeof constants] //@ts-ignore
                    .style.borderRadius,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        option: {
            padding: 10,
            color: themeColors.text.paragraph.primary,
            width: 200,
        },
    });
