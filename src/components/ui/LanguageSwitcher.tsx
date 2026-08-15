import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import "./LanguageSwitcher.css";

const LanguageSwitcher: React.FC = () => {
  const { i18n: i18nHook } = useTranslation();
  const currentLang = i18nHook.language;

  const toggle = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="lang-switcher" role="group" aria-label="Dil seçimi">
      <button
        id="lang-tr"
        className={`lang-switcher__btn ${currentLang === "tr" ? "lang-switcher__btn--active" : ""}`}
        onClick={() => toggle("tr")}
        aria-pressed={currentLang === "tr"}
      >
        TR
      </button>
      <span className="lang-switcher__sep">|</span>
      <button
        id="lang-en"
        className={`lang-switcher__btn ${currentLang === "en" ? "lang-switcher__btn--active" : ""}`}
        onClick={() => toggle("en")}
        aria-pressed={currentLang === "en"}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
