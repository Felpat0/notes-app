import { PressableProps, StyleProp, ViewStyle } from "react-native/types";
import { Pressable, ImageBackground, useWindowDimensions } from "react-native";
import { CardSize, CardVariant } from "../../types/theme";
import { getCardStyle } from "./style";
import { useMemo } from "react";
import { Text } from "../Text";

const image = require("../../assets/images/circlesBackground.png");

type Props = PressableProps & {
    title?: string;
    subtitle?: string;
    variant?: CardVariant;
    size?: CardSize;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export const Card: React.FC<Props> = ({
    title,
    subtitle,
    variant,
    size,
    onPress,
    ...props
}: Props) => {
    const dimensions = useWindowDimensions();
    const stylesheet = useMemo(
        () => getCardStyle(dimensions.width, variant, size),
        [size]
    );

    return (
        <Pressable
            onPress={onPress}
            {...props}
            style={[stylesheet.container, props.style]}
        >
            <ImageBackground
                source={image}
                resizeMode={"cover"}
                style={stylesheet.background}
                imageStyle={stylesheet.image}
            >
                <Text variant={"title"} colorVariant={"secondary"}>
                    {title}
                </Text>
                <Text variant={"subtitle"} colorVariant={"secondary"}>
                    {subtitle}
                </Text>
            </ImageBackground>
        </Pressable>
    );
};
