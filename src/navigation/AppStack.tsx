import { createStackNavigator } from "@react-navigation/stack";
import { constants } from "../config/constants";
import { HomeScreen } from "../screens/HomeScreen";
import { NoteScreen } from "../screens/NoteScreen";

export type RootStackParamList = {
    Home: undefined;
    Note: {
        noteId?: string;
    };
};
const Stack = createStackNavigator<RootStackParamList>();

export const AppStack = (
    <Stack.Navigator
        initialRouteName={"Home"}
        screenOptions={{
            presentation: "modal",
        }}
    >
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={constants.defaultStackScreenOptions}
        />
        <Stack.Screen
            name="Note"
            component={NoteScreen}
            options={{
                ...constants.defaultStackScreenOptions,
                animationEnabled: false,
            }}
        />
    </Stack.Navigator>
);
