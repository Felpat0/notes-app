import React, { useMemo } from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Modal, Text } from "..";
import { getAlertStyle } from "./style";
import { ModalProps } from "../Modal";
import { AlertVariant, AlertSize } from "../../types/theme";

export type AlertProps = ModalProps & {
    message?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    variant?: AlertVariant;
    size?: AlertSize;
};

export const Alert: React.FC<AlertProps> = ({
    message,
    onConfirm,
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
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <Modal {...props} onRequestClose={handleCancel}>
            <View style={stylesheet.container}>
                <View style={stylesheet.alert}>
                    <Text style={stylesheet.message}>{message}</Text>
                    <View style={stylesheet.buttons}>
                        <TouchableOpacity
                            style={stylesheet.button}
                            onPress={handleCancel}
                        >
                            <Text style={stylesheet.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={stylesheet.button}
                            onPress={handleConfirm}
                        >
                            <Text style={stylesheet.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
