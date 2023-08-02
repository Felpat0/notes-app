export type NoteType = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
};

export type NoteCreationType = {
    title?: string;
    content?: string;
};
