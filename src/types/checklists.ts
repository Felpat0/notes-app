import { NoteType } from "./notes";

export type ChecklistItemType = {
    id: string;
    text: string;
    isChecked: boolean;
};

export type ChecklistType = {
    id: string;
    items: ChecklistItemType[];
    date?: Date;
    noteId?: NoteType["id"];
    createdAt?: Date;
    updatedAt?: Date;
};

export type ChecklistCreationType = {
    items: ChecklistItemType[];
    date?: Date;
    noteId?: NoteType["id"];
};
