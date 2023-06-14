export type User = {
    id: string;
    username: string;
    email: string;
    password?: string;
};

export type UserCreationType = {
    username: string;
    email: string;
    password: string;
};
