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
    <Stack.Navigator
        initialRouteName={"Login"}
        screenOptions={{
            presentation: "modal",
        }}
    >
        <Stack.Screen
            name="Login"
            options={constants.defaultStackScreenOptions}
        >
            {(props) => (
                <ScrollView
                    style={styles.screenContainer}
                    keyboardShouldPersistTaps={"handled"}
                >
                    <LoginScreen {...props} />
                </ScrollView>
            )}
        </Stack.Screen>
        <Stack.Screen
            name="Signup"
            options={constants.defaultStackScreenOptions}
        >
            {(props) => (
                <ScrollView
                    style={styles.screenContainer}
                    keyboardShouldPersistTaps={"handled"}
                >
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
