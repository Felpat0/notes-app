import { ModalProps as RNModalProps } from "react-native/types";
import { Modal as RNModal, useWindowDimensions, View } from "react-native";
import { ModalSize, ModalVariant } from "../../types/theme";
import { getModalStyle } from "./style";
import { useMemo } from "react";
import { Text, TextProps } from "../Text";

export type ModalProps = RNModalProps & {
    title?: string;
    variant?: ModalVariant;
    size?: ModalSize;
    transparent?: boolean;
    titleProps?: TextProps;
};

export const Modal: React.FC<ModalProps> = ({
    title,
    variant,
    size,
    transparent = true,
    titleProps,
    ...props
}: ModalProps) => {
    const dimensions = useWindowDimensions();
    const stylesheet = useMemo(
        () => getModalStyle(dimensions.width, variant, size),
        [size]
    );

    return (
        <RNModal transparent={transparent} {...props}>
            <View style={stylesheet.container}>
                <View style={stylesheet.content}>
                    {title && (
                        <Text
                            variant={"subtitle"}
                            colorVariant={"primary"}
                            {...titleProps}
                            style={[stylesheet.title, titleProps?.style]}
                        >
                            {title}
                        </Text>
                    )}
                    {props.children}
                </View>
            </View>
        </RNModal>
    );
};
