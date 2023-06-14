import { ModalProps } from "react-native/types";
import { Modal as RNModal, useWindowDimensions, View } from "react-native";
import { ModalSize, ModalVariant } from "../../types/theme";
import { getModalStyle } from "./style";
import { useMemo } from "react";
import { Text } from "../Text";

type Props = ModalProps & {
    title?: string;
    variant?: ModalVariant;
    size?: ModalSize;
    transparent?: boolean;
};

export const Modal: React.FC<Props> = ({
    title,
    variant,
    size,
    transparent = true,
    ...props
}: Props) => {
    const dimensions = useWindowDimensions();
    const stylesheet = useMemo(
        () => getModalStyle(dimensions.width, variant, size),
        [size]
    );

    return (
        <RNModal transparent={transparent} {...props}>
            <View style={stylesheet.container}>
                <View style={stylesheet.content}>
                    <Text variant={"subtitle"} colorVariant={"primary"}>
                        {title}
                    </Text>
                    {props.children}
                </View>
            </View>
        </RNModal>
    );
};
