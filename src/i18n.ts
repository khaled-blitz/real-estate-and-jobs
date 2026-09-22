import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import germanTranslation from "@/locales/de/translation.json";
import englishTranslation from "@/locales/en/translation.json";
const resources = {
  en: {
    translation: englishTranslation,
  },
  de: {
    translation: germanTranslation,
  },
};
i18n
  .use(HttpApi) // Load translations using HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind i18next to React
  .init({
    resources,
    fallbackLng: "de", // Default language
    // debug: true, // Enable debug mode for development
    interpolation: {
      escapeValue: false, // React already escapes strings
    },
    saveMissing: false, // Disable reporting missing keys
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
    react: {
      useSuspense: true, // Enable suspense mode for lazy loading
    },
  });

export default i18n;
