import { initI18n } from "../init";
import ar from "./ar.json";
import en from "./en.json";

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export const fallbackLng = "en";
export type LanguageCode = keyof typeof resources;
const i18n = initI18n({ resources, fallbackLng });
export default i18n;
