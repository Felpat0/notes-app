import { View, ViewStyle } from "react-native";
import { dividerStyles } from "./style";

export type DividerPropsType = {
    style?: ViewStyle;
};

export const Divider: React.FC<DividerPropsType> = ({
    style,
}: DividerPropsType) => {
    return <View style={[dividerStyles.divider, style]} />;
};
