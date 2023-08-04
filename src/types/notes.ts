export type NoteType = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    pinned?: boolean;
    recurrences: NoteRecurrenceType[];
    userId?: string;
};

export type NoteCreationType = {
    title?: string;
    content?: string;
};

export type NoteRecurrenceType = {
    type: "punctual" | "daily" | "weekly" | "monthly" | "yearly" | "interval";
    startDate: Date;
    endDate?: Date;
    days?: number[]; // 0-6
    months?: number[]; // 0-11
    years?: number[];
};

export type SelectedNoteDataType = {
    note: NoteType;
    x: number;
    y: number;
};
