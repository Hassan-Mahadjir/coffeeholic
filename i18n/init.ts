import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

import { fallbackChecker } from "./fallbackChecker";
import { languageDetector } from "./languageDetector";

type InitI18nProps = {
  resources: Resource;
  fallbackLng: string;
};

export const initI18n = ({ resources, fallbackLng }: InitI18nProps) => {
  return i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: "en",
      fallbackLng: fallbackChecker(resources, fallbackLng),
      interpolation: {
        escapeValue: false,
      },
      compatibilityJSON: "v4",
    });
};
