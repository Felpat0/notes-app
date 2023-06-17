import {
    Text as RNText,
    TextProps as RNTextProps,
    useWindowDimensions,
} from "react-native";
import { getTextStyle } from "./style";
import { TextColorVariant, TextVariant } from "../../types/theme";
import { useMemo } from "react";

export type TextProps = RNTextProps & {
    variant?: TextVariant;
    colorVariant?: TextColorVariant;
};

export const Text: React.FC<TextProps> = ({
    children,
    style,
    variant,
    colorVariant,
    ...props
}: TextProps) => {
    const dimensions = useWindowDimensions();

    const stylesheet = useMemo(
        () => getTextStyle(dimensions.width, variant, colorVariant),
        [dimensions.width, variant]
    );

    return (
        <RNText style={[stylesheet.text, style]} {...props}>
            {children}
        </RNText>
    );
};
