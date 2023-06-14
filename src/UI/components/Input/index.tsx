import React, { useEffect, useMemo, useState } from "react";
import {
    Platform,
    TextInput,
    TextInputProps,
    useWindowDimensions,
} from "react-native";
import { getInputStyle } from "./style";
import { InputState, InputVariant } from "../../types/theme";
import { getInputColors } from "../../utils";

type Props = TextInputProps & {
    variant?: InputVariant;
    disabled?: boolean;
};

export const Input: React.FC<Props> = ({
    variant,
    disabled,
    style,
    ...props
}) => {
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
            style={[
                stylesheet.input,
                // @ts-ignore
                Platform.select({
                    web: {
                        outline: "none",
                    },
                }),
                style,
            ]}
            placeholderTextColor={
                getInputColors(variant, state).placeholderColor
            }
            {...props}
        />
    );
};
