import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChecklistCreationType, ChecklistType } from "../../types/checklists";
import { handleAsyncOperation } from "../../UI/utils";
import {
    createChecklist,
    deleteChecklist,
    getChecklistByDate,
    getChecklistById,
    updateChecklist,
} from "../../firebase/checklists";

export const useChecklists = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const getSingleChecklist = useCallback(
        async (
            idOrDate: ChecklistType["id"] | ChecklistType["date"]
        ): Promise<ChecklistType | undefined> => {
            if (!idOrDate) return Promise.reject("No id or date provided");

            return await handleAsyncOperation<ChecklistType | undefined>(
                () =>
                    typeof idOrDate === "string"
                        ? getChecklistById(idOrDate)
                        : getChecklistByDate(idOrDate),
                setLoading,
                setError,
                {
                    error: {
                        title: t("errors.checklists.title"),
                        message: t("errors.checklists.message"),
                    },
                }
            );
        },
        []
    );

    const createNewChecklist = useCallback(
        async (checklist: ChecklistCreationType): Promise<ChecklistType> => {
            return await handleAsyncOperation<ChecklistType>(
                () => createChecklist(checklist),
                setLoading,
                setError,
                {
                    error: {
                        title: t("errors.checklists.title"),
                        message: t("errors.checklists.message"),
                    },
                }
            );
        },
        []
    );

    const updateExistingChecklist = useCallback(
        async (checklist: ChecklistType): Promise<ChecklistType> => {
            return await handleAsyncOperation<ChecklistType>(
                () => updateChecklist(checklist),
                setLoading,
                setError,
                {
                    error: {
                        title: t("errors.checklists.title"),
                        message: t("errors.checklists.message"),
                    },
                }
            );
        },
        []
    );

    const deleteExistingChecklist = useCallback(
        async (id: ChecklistType["id"]): Promise<void> => {
            return await handleAsyncOperation<void>(
                () => deleteChecklist(id),
                setLoading,
                setError,
                {
                    error: {
                        title: t("errors.checklists.title"),
                        message: t("errors.checklists.message"),
                    },
                }
            );
        },
        []
    );

    return {
        getSingleChecklist,
        createNewChecklist,
        updateExistingChecklist,
        deleteExistingChecklist,
        loading,
        error,
    };
};
