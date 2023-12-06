import { View } from "react-native";
import { greetingStyle } from "./style";
import { useTranslation } from "react-i18next";
import { Text } from "../../../UI/components";

type Props = {
    name: string;
};

export const Greeting: React.FC<Props> = ({ name }: Props) => {
    const { t } = useTranslation();
    return (
        <View style={greetingStyle.container}>
            <Text style={greetingStyle.greetingText}>{t("home.greeting")}</Text>
            <Text style={greetingStyle.nameText}>{name}</Text>
        </View>
    );
};
