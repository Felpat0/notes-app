import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { themeColors } from "../../UI/theme/colors";
import { AppStack } from "../../navigation/AppStack";
import { AuthStack } from "../../navigation/AuthStack";
import { removeAlert } from "../../redux/slices/uiSlice";
import store, { useAppSelector } from "../../redux/store";
import { Alert } from "../../UI/components";

export const Root = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [initializing, setInitializing] = useState(true);
    const ui = useAppSelector((state) => state.ui);

    const onAuthStateChanged = useCallback(
        (user: FirebaseAuthTypes.User | null) => {
            setUser(user);
            if (initializing) setInitializing(false);
        },
        [initializing]
    );

    const handleCloseAlert = useCallback((id: number) => {
        store.dispatch(removeAlert({ id }));
    }, []);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <>
            <View style={styles.container}>
                {initializing ? (
                    <View></View>
                ) : (
                    <NavigationContainer>
                        {user ? AppStack : AuthStack}
                    </NavigationContainer>
                )}
            </View>
            {ui.alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    {...alert}
                    onClose={() => handleCloseAlert(alert.id)}
                />
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.background.primary,
    },
});
