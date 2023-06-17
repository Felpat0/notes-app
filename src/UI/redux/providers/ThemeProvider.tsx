import { Provider } from "react-redux";
import { store } from "../store";
import { Alert } from "../../components/Alert";
import { themeSlice } from "../slices/themeSlice";
import { useEffect } from "react";

type Props = {
    children?: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }: Props) => {
    useEffect(() => {
        store.dispatch(
            themeSlice.actions.addAlert({
                title: "Alert",
                message: "Ciao sono proprio un alert!",
                type: "error",
                actions: [
                    {
                        label: "Confirm",
                    },
                ],
            })
        );
    }, []);

    return (
        <Provider store={store}>
            {children}
            {store.getState().theme.alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    {...alert}
                    modalProps={{ ...alert.modalProps }}
                />
            ))}
        </Provider>
    );
};
