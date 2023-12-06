import React from "react";
import {
    ThemeContext,
    initialState,
    themeReducer,
} from "../reducers/themeReducer";

type Props = {
    children?: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }: Props) => {
    const [theme, dispatch] = React.useReducer(themeReducer, initialState);

    return (
        <ThemeContext.Provider value={{ state: theme, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
};
