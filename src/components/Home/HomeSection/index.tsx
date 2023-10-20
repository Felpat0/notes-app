import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "../../../UI/components";
import { homeSectionStyles } from "./style";

type HomeSectionProps = {
    title: string;
    icon?: React.ReactNode;
    onIconPress?: () => void;
    children?: React.ReactNode;
    containerStyle?: ViewStyle;
};

export const HomeSection: React.FC<HomeSectionProps> = ({
    title,
    icon,
    onIconPress,
    children,
    containerStyle,
}) => {
    return (
        <View style={homeSectionStyles.container}>
            <View style={homeSectionStyles.titleContainer}>
                <Text style={homeSectionStyles.title} variant={"subtitle"}>
                    {title}
                </Text>
                {icon && (
                    <TouchableOpacity onPress={onIconPress}>
                        {icon}
                    </TouchableOpacity>
                )}
            </View>
            <View style={[homeSectionStyles.children, containerStyle]}>
                {children}
            </View>
        </View>
    );
};
