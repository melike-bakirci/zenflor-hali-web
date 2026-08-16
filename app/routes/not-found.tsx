import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Home as HomeIcon,
  Mail,
  ArrowRight,
  Grid,
  Trees,
  Compass,
} from "lucide-react";
import Breadcrumb from "~/components/ui/Breadcrumb";
import QuoteCtaBanner from "~/components/ui/QuoteCtaBanner";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME } from "~/lib/constants";
import "./not-found.css";

export function meta() {
  return seoMeta({
    title: "404 - Sayfa Bulunamadı",
    description: `Aradığınız sayfa ${SITE_NAME} sitemizde bulunamadı.`,
    noindex: true,
  });
}

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {t("notFound.heroTitle")}
            </h1>
            <p className="page-hero__subtitle">
              {t("notFound.heroSubtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: t("nav.home"), url: "/" },
            { label: "404" },
          ]}
        />
      </div>

      <section className="section not-found__section">
        <div className="container not-found__container">
          <div className="not-found__card card">
            <div className="not-found__badge">
              <Compass size={42} className="not-found__icon" />
              <span className="not-found__code">404</span>
            </div>

            <h2 className="not-found__heading font-display">
              {t("notFound.heading")}
            </h2>

            <p className="not-found__desc">
              {t("notFound.desc")}
            </p>

            <div className="not-found__actions">
              <Link to="/" className="btn btn-primary btn-lg">
                <HomeIcon size={18} />
                <span>{t("common.backHome")}</span>
              </Link>
              <Link to="/iletisim" className="btn btn-outline btn-lg">
                <Mail size={18} />
                <span>{t("nav.contact")}</span>
              </Link>
            </div>

            {/* Quick Navigation Cards */}
            <div className="not-found__quick-links">
              <h3 className="not-found__quick-title">
                {t("notFound.quickTitle")}
              </h3>
              <div className="not-found__grid">
                <Link to="/karo-hali" className="not-found__quick-card">
                  <Grid size={22} className="not-found__qc-icon" />
                  <div>
                    <span className="not-found__qc-title">
                      {t("nav.karoHali")}
                    </span>
                    <span className="not-found__qc-desc">
                      {t("notFound.karoDesc")}
                    </span>
                  </div>
                  <ArrowRight size={16} className="not-found__qc-arrow" />
                </Link>

                <Link to="/cim-hali" className="not-found__quick-card">
                  <Trees size={22} className="not-found__qc-icon" />
                  <div>
                    <span className="not-found__qc-title">
                      {t("nav.cimHali")}
                    </span>
                    <span className="not-found__qc-desc">
                      {t("notFound.cimDesc")}
                    </span>
                  </div>
                  <ArrowRight size={16} className="not-found__qc-arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote CTA Banner */}
      <QuoteCtaBanner
        title={t("notFound.quoteBannerTitle")}
        subtitle={t("notFound.quoteBannerSubtitle")}
      />
    </div>
  );
};

export default NotFound;
