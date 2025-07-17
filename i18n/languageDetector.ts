import * as Localization from "expo-localization";
import { LanguageDetectorModule } from "i18next";

export const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  detect: () => {
    const locale = Localization.getLocales();
    const firstLanguageCode = locale[0].languageCode ?? "en";
    return firstLanguageCode;
  },
  init: () => {},
  cacheUserLanguage: () => {},
};
