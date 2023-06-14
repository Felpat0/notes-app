import React, { useState, useEffect, useMemo } from "react";
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    useWindowDimensions,
} from "react-native";
import { buttonStyle } from "./style";
import { ButtonState, ButtonVariant } from "../../types/theme";

type Props = TouchableOpacityProps & {
    width?: string | number;
    height?: string | number;
    variant?: ButtonVariant;
};

export const Button: React.FC<Props> = ({
    children,
    style,
    width,
    height,
    variant,
    ...props
}) => {
    const [state, setState] = useState<ButtonState>("idle");
    const dimensions = useWindowDimensions();

    const stylesheet = useMemo(
        () => buttonStyle(dimensions.width, variant, state),
        [dimensions.width, variant, state]
    );

    useEffect(() => {
        if (props.disabled) {
            setState("disabled");
        } else {
            setState("idle");
        }
    }, [props.disabled]);

    return (
        <TouchableOpacity
            style={[stylesheet.button, style, { width, height }]}
            {...props}
        >
            <Text style={stylesheet.text}>{children}</Text>
        </TouchableOpacity>
    );
};
