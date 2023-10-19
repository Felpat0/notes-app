import firestore from "@react-native-firebase/firestore";
import { getCurrentUser } from "./auth";
import { ChecklistCreationType, ChecklistType } from "../types/checklists";
import { firestoreChecklistToChecklist } from "../utils/conversions";

export const checklistRef = (checklistId: string) =>
    firestore().collection("checklists").doc(checklistId);

export const checklistsRef = firestore()
    .collection("checklists")
    .where("userId", "==", getCurrentUser()?.uid);

// eslint-disable-next-line @typescript-eslint/ban-types
export const performChecklistAction = async (action: Function) => {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("User not logged in");

    return await action();
};

export const getChecklists = async (): Promise<ChecklistType[]> =>
    performChecklistAction(async () => {
        const toReturn: ChecklistType[] = [];

        const querySnapshot = await checklistsRef.get();

        querySnapshot.forEach((doc) => {
            toReturn.push(
                firestoreChecklistToChecklist({
                    ...doc.data(),
                    id: doc.id,
                })
            );
        });

        return toReturn;
    });

export const getChecklistById = async (
    checklistId: string
): Promise<ChecklistType | undefined> =>
    performChecklistAction(async () => {
        const checklistSnapshot = await checklistRef(checklistId).get();

        if (checklistSnapshot.exists) {
            return firestoreChecklistToChecklist({
                ...checklistSnapshot.data(),
                id: checklistSnapshot.id,
            });
        }
    });

export const getChecklistByDate = async (
    date: Date
): Promise<ChecklistType | undefined> =>
    performChecklistAction(async () => {
        // Get the start and end of the day to query the right checklist
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const checklistSnapshot = await checklistsRef
            .where("date", ">=", startDate)
            .where("date", "<=", endDate)
            .get();

        if (checklistSnapshot.empty) return undefined;

        const checklist = checklistSnapshot.docs[0];

        return firestoreChecklistToChecklist({
            ...checklist.data(),
            id: checklist.id,
        });
    });

export const createChecklist = async (
    checklist: ChecklistCreationType
): Promise<ChecklistType> =>
    performChecklistAction(async () => {
        const currentUser = getCurrentUser();
        const newChecklistData = {
            ...checklist,
            userId: currentUser?.uid,
            items: checklist.items || [],
            createdAt: firestore.Timestamp.now(),
            updatedAt: firestore.Timestamp.now(),
        };

        const newChecklistRef = await firestore()
            .collection("checklists")
            .add(newChecklistData);
        await newChecklistRef.update({ id: newChecklistRef.id });

        return await getChecklistById(newChecklistRef.id);
    });

export const updateChecklist = async (
    checklist: ChecklistType
): Promise<ChecklistType> =>
    performChecklistAction(async () => {
        const currentUser = getCurrentUser();
        const newChecklistData = {
            ...checklist,
            userId: currentUser?.uid,
            updatedAt: firestore.Timestamp.now(),
        };
        await checklistRef(newChecklistData.id).update(newChecklistData);

        return await getChecklistById(newChecklistData.id);
    });

export const deleteChecklist = async (checklistId: string) =>
    performChecklistAction(async () => {
        await checklistRef(checklistId).delete();
    });
