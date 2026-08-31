import React from "react";
import { useTranslation } from "react-i18next";
import { Target, Eye } from "lucide-react";
import SectionTitle from "~/components/ui/SectionTitle";
import Breadcrumb from "~/components/ui/Breadcrumb";
import QuoteCtaBanner from "~/components/ui/QuoteCtaBanner";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME } from "~/lib/constants";
import "./about.css";

export function meta() {
  return seoMeta({
    title: `Hakkımızda | ${SITE_NAME}`,
    description: `${SITE_NAME} zemin çözümleri hakkında bilgi edinin. 20 yılı aşkın tecrübe ile ticari ofis karo halı ve peyzaj çim halı toptan ve perakende satışı.`,
    canonicalUrl: "/hakkimizda",
    keywords:
      "zenflor hakkında, zemin kaplama firmaları, karo halı firması, çim halı satan yerler, istanbul halı firmaları",
  });
}

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="about page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {t("about.title")}
            </h1>
            <p className="page-hero__subtitle">{t("about.subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: t("nav.home"), url: "/" },
            { label: t("nav.about") },
          ]}
        />
      </div>

      {/* Story */}
      <section className="section about__story">
        <div className="container about__story-grid">
          <div className="about__story-text">
            <SectionTitle title={t("about.story")} />
            <p className="about__para">{t("about.storyText1")}</p>
            <p className="about__para">{t("about.storyText2")}</p>
          </div>

          <div className="about__story-visual">
            <div className="about__story-image-wrap">
              <img
                src="/images/zenflor-karo-hali.jpeg"
                alt="Zenflor Karo Halı"
                className="about__story-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section about__mission-section">
        <div className="container">
          <div className="about__mv-grid">
            <div className="about__mv-card" id="vision-card">
              <div className="about__mv-icon about__mv-icon--vision">
                <Eye size={32} />
              </div>
              <h2 className="about__mv-title">
                {t("about.visionTitle")}
              </h2>
              <p className="about__mv-text">{t("about.visionText")}</p>
            </div>
            <div className="about__mv-card" id="mission-card">
              <div className="about__mv-icon">
                <Target size={32} />
              </div>
              <h2 className="about__mv-title">
                {t("about.missionTitle")}
              </h2>
              <p className="about__mv-text">{t("about.missionText")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote CTA Banner */}
      <QuoteCtaBanner
        title={t("about.quoteBannerTitle")}
        subtitle={t("about.quoteBannerSubtitle")}
      />
    </div>
  );
};

export default About;
