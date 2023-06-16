import React, { createContext, useReducer } from "react";
import { initialState, themeReducer } from "../reducers/themeReducer";
import { ThemeActionType, ThemeStateType } from "../../types/context";

type ThemeContextType = {
    state: ThemeStateType;
    dispatch: React.Dispatch<ThemeActionType>;
};

export const ThemeContext = createContext<ThemeContextType>({
    state: initialState,
    dispatch: () => null,
});

type Props = {
    children?: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
};
