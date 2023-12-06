import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { TextInput, TextInputProps, useWindowDimensions } from "react-native";
import { getInputStyle } from "./style";
import { InputState, InputVariant } from "../../types/theme";
import { getInputColors } from "../../utils";

export type InputProps = TextInputProps & {
    variant?: InputVariant;
    disabled?: boolean;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
    { variant, disabled, style, ...props },
    ref
) {
    const [state, setState] = useState<InputState>("idle");
    const dimensions = useWindowDimensions();

    const stylesheet = useMemo(
        () => getInputStyle(dimensions.width, variant, state),
        [dimensions.width, variant, state]
    );

    useEffect(() => {
        if (disabled) {
            setState("disabled");
        } else {
            setState("idle");
        }
    }, [disabled]);

    return (
        <TextInput
            ref={ref}
            style={[stylesheet.input, style]}
            placeholderTextColor={
                getInputColors(variant, state).placeholderColor
            }
            onFocus={() => setState("focused")}
            onBlur={() => setState("idle")}
            {...props}
        />
    );
});
