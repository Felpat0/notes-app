import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Text, Input, Button } from "../../UI/components";
import { loginUser } from "../../firebase/auth";
import { loginScreenStyles } from "./style";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStack";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = useCallback(async () => {
        const loggedInUser = await loginUser(email, password);
        if (loggedInUser) {
            console.log("User logged in: ", loggedInUser);
            // Redirect to the dashboard or home screen
        } else {
            console.log("Login failed");
        }
    }, [email, password]);

    const handleSignup = useCallback(() => {
        navigation.navigate("Signup");
    }, [navigation]);

    return (
        <View style={loginScreenStyles.container}>
            <Text style={loginScreenStyles.title} variant={"title"}>
                Login
            </Text>
            <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                style={loginScreenStyles.input}
            />
            <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                style={loginScreenStyles.input}
                autoCapitalize="none"
                secureTextEntry
            />
            <Button onPress={handleLogin} width={"80%"}>
                Login
            </Button>
            <Button onPress={handleSignup} width={"80%"}>
                {"Don't have an account? Signup"}
            </Button>
        </View>
    );
};

export default LoginScreen;
