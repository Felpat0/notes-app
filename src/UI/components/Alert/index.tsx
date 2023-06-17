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
    onCancel?: () => void;
    variant?: AlertVariant;
    size?: AlertSize;
    modalProps?: ModalProps;
};

export const Alert: React.FC<AlertProps> = ({
    message,
    title,
    actions = [],
    onCancel,
    variant = "default",
    size = "auto",
    ...props
}) => {
    const dimensions = useWindowDimensions();
    const stylesheet = useMemo(
        () => getAlertStyle(dimensions.width, variant, size),
        [size]
    );

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <Modal
            title={title}
            {...props.modalProps}
            onRequestClose={handleCancel}
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
};
