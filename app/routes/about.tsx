import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Target, Eye, Globe, ExternalLink } from "lucide-react";
import SectionTitle from "~/components/ui/SectionTitle";
import Breadcrumb from "~/components/ui/Breadcrumb";
import QuoteCtaBanner from "~/components/ui/QuoteCtaBanner";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME } from "~/lib/constants";
import "./about.css";

export function meta() {
  return seoMeta({
    title: `Hakkımızda |  Güvenilir Zemin Kaplama Çözümleri | ${SITE_NAME} `,
    description: `${SITE_NAME} zemin çözümleri hakkında bilgi edinin. 20 yılı aşkın tecrübe ile ticari ofis karo halı ve peyzaj çim halı toptan ve perakende satışı.`,
    canonicalUrl: "/hakkimizda",
    keywords:
      "zenflor hakkında, zemin kaplama firmaları, karo halı firması, çim halı satan yerler, istanbul halı firmaları",
    breadcrumbs: [
      { label: "Ana Sayfa", url: "/" },
      { label: "Hakkımızda", url: "/hakkimizda" },
    ],
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
            <p className="about__para">
              2006 yılında İstanbul'da başlayan yolculuğumuz, bugün Türkiye'nin dört bir yanına ulaşan bir hizmete dönüştü. Yaşam ve çalışma alanlarına değer katma tutkusuyla çıktığımız bu yolda, her projeyi kendi yerimizmiş gibi özenle ele alıyoruz.
            </p>
            <p className="about__para">
              <Link to="/karo-hali">Karo halı</Link> ve{" "}
              <Link to="/cim-hali">çim halı</Link> başta olmak üzere geniş bir
              yelpazede, aklınızdaki fikri gerçeğe dönüştürmek için çalışıyoruz.
              Yılların bize kattığı tecrübeyle mekanlarınıza sıcaklık, şıklık ve
              konfor taşıyoruz.{" "}
              <Link to="/galeri">Uygulama galerimizde</Link> hayata geçirdiğimiz
              projeleri inceleyebilir, aklınızdaki fikirler için{" "}
              <Link to="/iletisim">bizimle iletişime geçebilirsiniz</Link>.
            </p>
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
            <a
              href="https://zenparke.com.tr/"
              target="_blank"
              rel="noopener noreferrer"
              className="about__story-link"
              title="ZenFlor Parke Sitemiz"
            >
              <Globe size={18} className="about__story-link-icon" />
              <span>ZenFlor Parke Sitemiz</span>
              <ExternalLink size={14} className="about__story-link-arrow" />
            </a>
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
