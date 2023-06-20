import React, { useMemo } from "react";
import { View, useWindowDimensions } from "react-native";
import { Button, Modal, Text } from "..";
import { getAlertStyle } from "./style";
import { ModalProps } from "../Modal";
import { AlertVariant, AlertSize, ActionType } from "../../types/theme";

export type AlertProps = {
    message?: string;
    title?: string;
    actions?: ActionType[];
    onClose?: () => void;
    variant?: AlertVariant;
    size?: AlertSize;
    modalProps?: ModalProps;
};

export const Alert: React.FC<AlertProps> = ({
    message,
    title,
    actions = [],
    onClose,
    variant = "default",
    size = "auto",
    ...props
}) => {
    const dimensions = useWindowDimensions();
    const stylesheet = useMemo(
        () => getAlertStyle(dimensions.width, variant, size),
        [size]
    );

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal
            title={title}
            {...props.modalProps}
            onRequestClose={handleClose}
            titleProps={{ style: stylesheet.title }}
        >
            <View style={stylesheet.container}>
                <Text style={stylesheet.message}>{message}</Text>
                <View style={stylesheet.buttons}>
                    {actions.map((action, index) => (
                        <Button key={index} {...action}>
                            {action.label}
                        </Button>
                    ))}
                </View>
            </View>
        </Modal>
    );

    /* return (
        <Modal
            title={title}
            {...props.modalProps}
            onRequestClose={handleClose}
            titleProps={{ style: stylesheet.title }}
        >
            <View style={stylesheet.container}>
                <Text style={stylesheet.message}>{message}</Text>
                <View style={stylesheet.buttons}>
                    {actions.map((action, index) => (
                        <Button key={index} {...action}>
                            {action.label}
                        </Button>
                    ))}
                </View>
            </View>
        </Modal>
    ); */
};
