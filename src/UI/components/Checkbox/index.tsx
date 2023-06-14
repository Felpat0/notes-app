import React, { useState, useEffect, useMemo } from "react";
import {
    Pressable,
    PressableProps,
    StyleProp,
    Text,
    View,
    ViewStyle,
    useWindowDimensions,
} from "react-native";
import { checkboxStyle } from "./style";
import {
    CheckboxSize,
    CheckboxState,
    CheckboxVariant,
} from "../../types/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = PressableProps & {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    children?: React.ReactNode;
    width?: string | number;
    height?: string | number;
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    style?: StyleProp<ViewStyle>;
};

export const Checkbox: React.FC<Props> = ({
    children,
    checked,
    onChange,
    width,
    height,
    variant,
    size = "medium",
    style,
    ...props
}) => {
    const [state, setState] = useState<CheckboxState>("idle");
    const dimensions = useWindowDimensions();

    const stylesheet = useMemo(
        () => checkboxStyle(dimensions.width, variant, state, size),
        [dimensions.width, variant, state, size]
    );

    useEffect(() => {
        if (props.disabled) {
            setState("disabled");
        } else {
            setState("idle");
        }
    }, [props.disabled]);

    const handlePress = () => {
        onChange && onChange(!checked);
    };

    return (
        <View style={[stylesheet.container]}>
            <Pressable
                style={[stylesheet.checkbox, style, { width, height }]}
                onPress={handlePress}
                {...props}
            >
                {checked && (
                    <FontAwesome
                        name={"check"}
                        size={11}
                        color={stylesheet.text.color}
                    />
                )}
            </Pressable>
            {children && <Text style={[stylesheet.text]}>{children}</Text>}
        </View>
    );
};
