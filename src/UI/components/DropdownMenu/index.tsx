import React, {
    useCallback,
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
    position?: "left" | "right";
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
    position = "left",
}: DropdownMenuProps) => {
    const [showOptions, setShowOptions] = useState(false);
    const [measure, setMeasure] = useState<Measure | undefined>();
    const dimensions = useWindowDimensions();
    const triggerRef = useRef<TouchableOpacity | null>(null);

    const styles = useMemo(
        () => getDropdownMenuStyles(position, dimensions.width, measure),
        [position, dimensions, measure]
    );

    const handleSelectOption = useCallback(
        (option: string) => {
            setShowOptions(false);
            onSelect && onSelect(option);
        },
        [onSelect]
    );

    useLayoutEffect(() => {
        triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setMeasure({ x, y, width, height, pageX, pageY });
        });
    }, [showOptions]);

    return (
        <View>
            <TouchableOpacity
                ref={triggerRef}
                onPress={() => setShowOptions(!showOptions)}
            >
                {children}
            </TouchableOpacity>
            <Modal
                visible={showOptions}
                transparent={true}
                onRequestClose={() => setShowOptions(false)}
            >
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    onPress={() => setShowOptions(false)}
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
