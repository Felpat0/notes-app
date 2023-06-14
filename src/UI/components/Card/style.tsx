import { StyleSheet } from "react-native";
import { constants } from "../../config/constants";
import { CardSize, CardVariant } from "../../types/theme";
import { getDeviceType } from "../../utils";

export const getCardStyle = (
    deviceWidth: number,
    variant: CardVariant = "default",
    size: CardSize = "medium"
) =>
    StyleSheet.create({
        container: {
            // @ts-ignore
            borderRadius:
                constants[getDeviceType(deviceWidth) as keyof typeof constants] // @ts-ignore
                    .style.borderRadius,
            width: constants[
                getDeviceType(deviceWidth) as keyof typeof constants // @ts-ignore
            ].size.card[size].width,
            height: constants[
                getDeviceType(deviceWidth) as keyof typeof constants // @ts-ignore
            ].size.card[size].height,
        },
        background: {
            flex: 1,
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        image: {
            borderRadius:
                constants[getDeviceType(deviceWidth) as keyof typeof constants] // @ts-ignore
                    .style.borderRadius,
        },
        title: {},
        subtitle: {},
    });
