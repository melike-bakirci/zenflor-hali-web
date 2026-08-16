import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from "./locales/tr.json";

const savedLang =
  typeof window !== "undefined" ? localStorage.getItem("lang") || "tr" : "tr";

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
  },
  lng: savedLang,
  fallbackLng: "tr",
  interpolation: { escapeValue: false },
});

export default i18n;
