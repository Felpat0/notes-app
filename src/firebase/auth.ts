import { User, UserCreationType } from "../types/auth";
import auth from "@react-native-firebase/auth";

export const getCurrentUser = () => {
    return auth().currentUser;
};

export const signupUser = async (
    user: UserCreationType
): Promise<User | undefined> => {
    const { email, password, username } = user;

    try {
        const userCredential = await auth().createUserWithEmailAndPassword(
            email,
            password
        );
        userCredential.user
            .updateProfile({
                displayName: username,
            })
            .finally(() => {
                return { ...userCredential.user, username };
            });
    } catch (error) {
        console.log("Error in signupUser: ", error);
        return undefined;
    }
};

export const loginUser = async (
    email: string,
    password: string
): Promise<User | undefined> => {
    return auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = {
                ...userCredential.user,
                id: userCredential.user.uid,
                username: userCredential.user.displayName || "",
                email: userCredential.user.email || "",
            };
            return user;
        })
        .catch((error) => {
            console.log("Error in loginUser: ", error);
            return undefined;
        });
};

export const logout = () => {
    auth().signOut();
};
