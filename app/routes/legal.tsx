import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  FileText,
  Lock,
  Cookie,
  Calendar,
  Mail,
  Building,
} from "lucide-react";
import Breadcrumb from "~/components/ui/Breadcrumb";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME } from "~/lib/constants";
import type { MetaArgs } from "react-router";
import "./legal.css";

export type LegalTabType = "privacy" | "terms" | "kvkk" | "cookies";

const TAB_ROUTES: Record<LegalTabType, string> = {
  privacy: "/gizlilik",
  terms: "/kosullar",
  kvkk: "/kvkk",
  cookies: "/cerez-politikasi",
};

function tabFromPath(pathname: string): LegalTabType {
  if (pathname === "/kosullar") return "terms";
  if (pathname === "/kvkk") return "kvkk";
  if (pathname === "/cerez-politikasi") return "cookies";
  return "privacy";
}

export function meta({ location }: MetaArgs) {
  const tab = tabFromPath(location.pathname);
  const titleMap: Record<LegalTabType, string> = {
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
    kvkk: "KVKK Aydınlatma Metni",
    cookies: "Çerez Politikası",
  };
  return seoMeta({
    title: `${titleMap[tab]} | ${SITE_NAME}`,
    description: `${SITE_NAME} yasal bilgilendirme, gizlilik politikası, KVKK aydınlatma metni, mesafeli satış sözleşmesi ve çerez politikası detayları.`,
    canonicalUrl: TAB_ROUTES[tab],
    noindex: true,
  });
}

const Legal: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const metaTitles: Record<LegalTabType, string> = {
    privacy: t("legal.privacyTitle"),
    terms: t("legal.termsTitle"),
    kvkk: t("legal.kvkkTitle"),
    cookies: t("legal.cookiesTitle"),
  };

  const [activeTab, setActiveTab] = useState<LegalTabType>(() =>
    tabFromPath(location.pathname),
  );

  // Sync state with pathname on location change
  useEffect(() => {
    setActiveTab(tabFromPath(location.pathname));
  }, [location.pathname]);

  const handleTabChange = (tab: LegalTabType) => {
    setActiveTab(tab);
    navigate(TAB_ROUTES[tab]);
  };

  return (
    <div className="legal-page page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {t("legal.heroTitle")}
            </h1>
            <p className="page-hero__subtitle">
              {t("legal.heroSubtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: t("nav.home"), url: "/" },
            { label: t("legal.heroTitle"), url: "/gizlilik" },
            {
              label: metaTitles[activeTab],
            },
          ]}
        />
      </div>

      <div className="container legal__container">
        {/* Navigation Tabs */}
        <div className="legal__tabs" role="tablist" aria-label={t("legal.heroTitle")}>
          <button
            className={`legal__tab ${activeTab === "privacy" ? "legal__tab--active" : ""}`}
            onClick={() => handleTabChange("privacy")}
            role="tab"
            aria-selected={activeTab === "privacy"}
          >
            <span className="legal__tab-icon">
              <Lock size={18} />
            </span>
            {t("legal.privacyTitle")}
          </button>

          <button
            className={`legal__tab ${activeTab === "terms" ? "legal__tab--active" : ""}`}
            onClick={() => handleTabChange("terms")}
            role="tab"
            aria-selected={activeTab === "terms"}
          >
            <span className="legal__tab-icon">
              <FileText size={18} />
            </span>
            {t("legal.termsTitle")}
          </button>

          <button
            className={`legal__tab ${activeTab === "kvkk" ? "legal__tab--active" : ""}`}
            onClick={() => handleTabChange("kvkk")}
            role="tab"
            aria-selected={activeTab === "kvkk"}
          >
            <span className="legal__tab-icon">
              <ShieldCheck size={18} />
            </span>
            {t("legal.kvkkTitle")}
          </button>

          <button
            className={`legal__tab ${activeTab === "cookies" ? "legal__tab--active" : ""}`}
            onClick={() => handleTabChange("cookies")}
            role="tab"
            aria-selected={activeTab === "cookies"}
          >
            <span className="legal__tab-icon">
              <Cookie size={18} />
            </span>
            {t("legal.cookiesTitle")}
          </button>
        </div>

        {/* Content Box */}
        <div className="legal__document">
          {activeTab === "privacy" && <PrivacyContent />}
          {activeTab === "terms" && <TermsContent />}
          {activeTab === "kvkk" && <KvkkContent />}
          {activeTab === "cookies" && <CookiesContent />}
        </div>
      </div>
    </div>
  );
};

/* --- TAB CONTENT COMPONENTS --- */

// 1. Privacy Policy
const PrivacyContent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <article>
      <header className="legal__doc-header">
        <h2 className="legal__doc-title">
          {t("legal.privacyTitle")}
        </h2>
        <div className="legal__doc-meta">
          <span className="legal__doc-meta-item">
            <Calendar size={14} />{" "}
            {t("legal.lastUpdate")}
          </span>
          <span className="legal__doc-meta-item">
            <Building size={14} /> {t("legal.companyTag", { siteName: SITE_NAME })}
          </span>
        </div>
      </header>

      <div className="legal__doc-body">
        <p className="legal__intro">
          {t("legal.privacyIntro", { siteName: SITE_NAME })}
        </p>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">1</span>
            {t("legal.privacySec1Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.privacySec1Text")}
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              {t("legal.privacySec1Item1")}
            </li>
            <li className="legal__list-item">
              {t("legal.privacySec1Item2")}
            </li>
            <li className="legal__list-item">
              {t("legal.privacySec1Item3")}
            </li>
            <li className="legal__list-item">
              {t("legal.privacySec1Item4")}
            </li>
          </ul>
        </section>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">2</span>
            {t("legal.privacySec2Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.privacySec2Text")}
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              {t("legal.privacySec2Item1")}
            </li>
            <li className="legal__list-item">
              {t("legal.privacySec2Item2")}
            </li>
            <li className="legal__list-item">
              {t("legal.privacySec2Item3")}
            </li>
            <li className="legal__list-item">
              {t("legal.privacySec2Item4")}
            </li>
          </ul>
        </section>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">3</span>
            {t("legal.privacySec3Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.privacySec3Text", { siteName: SITE_NAME })}
          </p>
        </section>

        <div className="legal__contact-box">
          <div className="legal__contact-icon">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="legal__contact-title">
              {t("legal.privacyContactTitle")}
            </h4>
            <p className="legal__contact-text">
              {t("legal.privacyContactText")}
            </p>
            <a
              href="mailto:zenflormarket@gmail.com"
              className="legal__contact-email"
            >
              zenflormarket@gmail.com
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

// 2. Terms of Use
const TermsContent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <article>
      <header className="legal__doc-header">
        <h2 className="legal__doc-title">
          {t("legal.termsTitle")}
        </h2>
        <div className="legal__doc-meta">
          <span className="legal__doc-meta-item">
            <Calendar size={14} />{" "}
            {t("legal.lastUpdate")}
          </span>
          <span className="legal__doc-meta-item">
            <Building size={14} /> {t("legal.companyTag", { siteName: SITE_NAME })}
          </span>
        </div>
      </header>

      <div className="legal__doc-body">
        <p className="legal__intro">
          {t("legal.termsIntro", { siteName: SITE_NAME })}
        </p>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">1</span>
            {t("legal.termsSec1Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.termsSec1Text", { siteName: SITE_NAME })}
          </p>
        </section>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">2</span>
            {t("legal.termsSec2Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.termsSec2Text")}
          </p>
        </section>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">3</span>
            {t("legal.termsSec3Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.termsSec3Text", { siteName: SITE_NAME })}
          </p>
        </section>

        <div className="legal__contact-box">
          <div className="legal__contact-icon">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="legal__contact-title">
              {t("legal.termsContactTitle")}
            </h4>
            <p className="legal__contact-text">
              {t("legal.termsContactText")}
            </p>
            <a
              href="mailto:zenflormarket@gmail.com"
              className="legal__contact-email"
            >
              zenflormarket@gmail.com
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

// 3. KVKK Content
const KvkkContent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <article>
      <header className="legal__doc-header">
        <h2 className="legal__doc-title">
          {t("legal.kvkkTitle")}
        </h2>
        <div className="legal__doc-meta">
          <span className="legal__doc-meta-item">
            <Calendar size={14} />{" "}
            {t("legal.lastUpdate")}
          </span>
          <span className="legal__doc-meta-item">
            <Building size={14} /> {t("legal.kvkkTag")}
          </span>
        </div>
      </header>

      <div className="legal__doc-body">
        <p className="legal__intro">
          {t("legal.kvkkIntro", { siteName: SITE_NAME })}
        </p>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">1</span>
            {t("legal.kvkkSec1Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.kvkkSec1Text", { siteName: SITE_NAME })}
          </p>
        </section>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">2</span>
            {t("legal.kvkkSec2Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.kvkkSec2Text")}
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              {t("legal.kvkkSec2Item1")}
            </li>
            <li className="legal__list-item">
              {t("legal.kvkkSec2Item2")}
            </li>
            <li className="legal__list-item">
              {t("legal.kvkkSec2Item3")}
            </li>
          </ul>
        </section>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">3</span>
            {t("legal.kvkkSec3Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.kvkkSec3Text")}
          </p>
        </section>

        <div className="legal__contact-box">
          <div className="legal__contact-icon">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="legal__contact-title">
              {t("legal.kvkkContactTitle")}
            </h4>
            <p className="legal__contact-text">
              {t("legal.kvkkContactText")}
            </p>
            <a
              href="mailto:zenflormarket@gmail.com"
              className="legal__contact-email"
            >
              zenflormarket@gmail.com
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

// 4. Cookies Content
const CookiesContent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <article>
      <header className="legal__doc-header">
        <h2 className="legal__doc-title">
          {t("legal.cookiesTitle")}
        </h2>
        <div className="legal__doc-meta">
          <span className="legal__doc-meta-item">
            <Calendar size={14} />{" "}
            {t("legal.lastUpdate")}
          </span>
          <span className="legal__doc-meta-item">
            <Building size={14} /> {t("legal.cookiesTag", { siteName: SITE_NAME })}
          </span>
        </div>
      </header>

      <div className="legal__doc-body">
        <p className="legal__intro">
          {t("legal.cookiesIntro", { siteName: SITE_NAME })}
        </p>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">1</span>
            {t("legal.cookiesSec1Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.cookiesSec1Text")}
          </p>
        </section>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">2</span>
            {t("legal.cookiesSec2Title")}
          </h3>
          <ul className="legal__list">
            <li className="legal__list-item">
              <strong>{t("legal.cookiesSec2Item1Title")}</strong>{" "}
              {t("legal.cookiesSec2Item1Text")}
            </li>
            <li className="legal__list-item">
              <strong>
                {t("legal.cookiesSec2Item2Title")}
              </strong>{" "}
              {t("legal.cookiesSec2Item2Text")}
            </li>
            <li className="legal__list-item">
              <strong>
                {t("legal.cookiesSec2Item3Title")}
              </strong>{" "}
              {t("legal.cookiesSec2Item3Text")}
            </li>
          </ul>
        </section>

        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">3</span>
            {t("legal.cookiesSec3Title")}
          </h3>
          <p className="legal__paragraph">
            {t("legal.cookiesSec3Text")}
          </p>
        </section>

        <div className="legal__contact-box">
          <div className="legal__contact-icon">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="legal__contact-title">
              {t("legal.cookiesContactTitle")}
            </h4>
            <p className="legal__contact-text">
              {t("legal.cookiesContactText")}
            </p>
            <a
              href="mailto:zenflormarket@gmail.com"
              className="legal__contact-email"
            >
              zenflormarket@gmail.com
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Legal;
