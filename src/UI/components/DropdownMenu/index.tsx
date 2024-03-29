import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { getDropdownMenuStyles } from "./style";
import { DropdownOption, Measure } from "../../types";
import { StyleSheet } from "react-native";
import { colors } from "../../../UI/theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

type DropdownMenuProps = {
    children?: React.ReactNode;
    options: DropdownOption[];
    onSelect?: (value: DropdownOption["value"]) => void;
    onClose?: () => void;
    position?: "left" | "right";
    forceOptionsOpen?: boolean;
    coordinates?: {
        x: number;
        y: number;
    };
    hideTrigger?: boolean;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    children = (
        <Ionicons
            name={"ellipsis-vertical-sharp"}
            color={colors.white1}
            size={25}
        />
    ),
    options,
    onSelect,
    onClose,
    position = "left",
    forceOptionsOpen,
    coordinates,
    hideTrigger,
}: DropdownMenuProps) => {
    const [showOptions, setShowOptions] = useState(false);
    const [measure, setMeasure] = useState<Measure | undefined>();
    const dimensions = useWindowDimensions();
    const triggerRef = useRef<TouchableOpacity | null>(null);

    const updatedPosition: "left" | "right" = useMemo(() => {
        if (coordinates) {
            return coordinates.x > dimensions.width / 2 ? "left" : "right";
        }
        return position;
    }, [coordinates]);

    const styles = useMemo(() => {
        const newMeasure = measure;
        if (coordinates && newMeasure) {
            newMeasure.pageX = coordinates.x;
            newMeasure.pageY = coordinates.y;
            newMeasure.width = 0;
            newMeasure.height = 0;
        }
        return getDropdownMenuStyles(
            updatedPosition,
            dimensions.width,
            newMeasure
        );
    }, [dimensions, measure, coordinates, updatedPosition]);

    useEffect(() => {
        if (forceOptionsOpen !== undefined) {
            setShowOptions(forceOptionsOpen);
        }
    }, [forceOptionsOpen]);

    useLayoutEffect(() => {
        triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setMeasure({ x, y, width, height, pageX, pageY });
        });
    }, [showOptions]);

    const handleClose = useCallback(() => {
        setShowOptions(false);
        onClose && onClose();
    }, [onClose]);

    const handleSelectOption = useCallback(
        (option: string) => {
            handleClose();
            onSelect && onSelect(option);
        },
        [onSelect, handleClose]
    );

    return (
        <View>
            <TouchableOpacity
                ref={triggerRef}
                onPress={() => setShowOptions(!showOptions)}
            >
                {!hideTrigger && children}
            </TouchableOpacity>
            <Modal
                visible={showOptions}
                transparent={true}
                onRequestClose={handleClose}
            >
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    onPress={handleClose}
                />
                <View style={styles.options}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.label}
                            onPress={() => handleSelectOption(option.value)}
                        >
                            <Text style={styles.option}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
};
