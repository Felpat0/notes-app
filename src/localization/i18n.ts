import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import { findBestLanguageTag } from "react-native-localize";

import it from "./it.json";
import en from "./en.json";

export const resources = {
    it: {
        translation: it,
    },
    en: {
        translation: en,
    },
};

export const DEFAULT_LOCALE = "it";

export const defaultLanguage =
    findBestLanguageTag(Object.keys(resources))?.languageTag || DEFAULT_LOCALE;

export const currentLanguage = i18n.language || defaultLanguage;

const useLanguageStorage: LanguageDetectorAsyncModule = {
    type: "languageDetector",
    async: true,
    detect: async () => {
        const lang = await AsyncStorage.getItem("language");
        return lang || undefined;
    },
    init: () => null,
    cacheUserLanguage: async (language: string) => {
        AsyncStorage.setItem("language", language);
    },
};

i18n.use(useLanguageStorage)
    .use(initReactI18next)
    .init({
        fallbackLng: defaultLanguage,
        compatibilityJSON: "v3",
        resources,
        react: {
            useSuspense: false,
        },
    });

export default i18n;
