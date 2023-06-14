import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Text, Input, Button } from "../../UI/components";
import { signupUser } from "../../firebase/auth";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = useCallback(async () => {
        const loggedInUser = await signupUser({ username, email, password });
        if (loggedInUser) {
            console.log("User logged in: ", loggedInUser);
            // Redirect to the dashboard or home screen
        } else {
            console.log("Signup failed");
        }
    }, [username, email, password]);

    const navigateToLogin = useCallback(() => {
        navigation.navigate("Login");
    }, [navigation]);

    return (
        <View>
            <Text>Signup</Text>
            <Input
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                autoCapitalize="none"
            />
            <Button onPress={handleSignup}>Signup</Button>
            <Button onPress={navigateToLogin}>
                Already have an account? Login
            </Button>
        </View>
    );
};

export default SignupScreen;
