import { Text as RNText, TextProps, useWindowDimensions } from "react-native";
import { getTextStyle } from "./style";
import { TextColorVariant, TextVariant } from "../../types/theme";
import { useMemo } from "react";

type Props = TextProps & {
    variant?: TextVariant;
    colorVariant?: TextColorVariant;
};

export const Text: React.FC<Props> = ({
    children,
    style,
    variant,
    colorVariant,
    ...props
}: Props) => {
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
