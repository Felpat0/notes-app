import { createStackNavigator } from "@react-navigation/stack";
import { constants } from "../config/constants";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { themeColors } from "../UI/theme/colors";
import { ScrollView, StyleSheet } from "react-native";

export type AuthStackParamList = {
    Signup: undefined;
    Login: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = (
    <Stack.Navigator initialRouteName={"Login"}>
        <Stack.Screen
            name="Login"
            options={constants.defaultStackScreenOptions}
        >
            {(props) => (
                <ScrollView style={styles.screenContainer}>
                    <LoginScreen {...props} />
                </ScrollView>
            )}
        </Stack.Screen>
        <Stack.Screen
            name="Signup"
            options={constants.defaultStackScreenOptions}
        >
            {(props) => (
                <ScrollView style={styles.screenContainer}>
                    <SignupScreen {...props} />
                </ScrollView>
            )}
        </Stack.Screen>
    </Stack.Navigator>
);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: themeColors.background.primary,
    },
});
