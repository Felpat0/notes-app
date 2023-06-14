import { StyleSheet, View } from "react-native";
import { themeColors } from "./src/UI/theme/colors";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./src/navigation/AuthStack";
import { AppStack } from "./src/navigation/AppStack";
import { useCallback, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const App = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = useCallback(
        (user: FirebaseAuthTypes.User | null) => {
            setUser(user);
            if (initializing) setInitializing(false);
        },
        [initializing]
    );

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <View style={styles.container}>
            {initializing ? (
                <View></View>
            ) : (
                <NavigationContainer>
                    {user ? AppStack : AuthStack}
                </NavigationContainer>
            )}
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.background.primary,
    },
});
