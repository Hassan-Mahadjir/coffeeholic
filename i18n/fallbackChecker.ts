import { Resource } from "i18next";

export const fallbackChecker = (resources: Resource, fallbackLng: string) => {
  const languages = Object.keys(resources);
  const hasFallback = languages.find((lang) => lang === fallbackLng);

  if (!hasFallback) {
    throw new Error(
      `fallbackLng  "${fallbackLng}", is not present in your resources, please check your config, languages available: ${languages.join(
        ", "
      )}`
    );
  }
  return fallbackLng;
};
