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
              {"404 - Sayfa Bulunamadı"}
            </h1>
            <p className="page-hero__subtitle">
              {"Aradığınız sayfa silinmiş, değiştirilmiş veya adresi yanlış girilmiş olabilir."}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", url: "/" },
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
              {"Aradığınız Sayfayı Bulamadık"}
            </h2>

            <p className="not-found__desc">
              {"Üzgünüz, ulaşmaya çalıştığınız sayfa sitemizde yer almıyor. Ana sayfaya dönebilir veya koleksiyonlarımıza göz atabilirsiniz."}
            </p>

            <div className="not-found__actions">
              <Link to="/" className="btn btn-primary btn-lg">
                <HomeIcon size={18} />
                <span>{t("common.backHome", "Ana Sayfaya Dön")}</span>
              </Link>
              <Link to="/iletisim" className="btn btn-outline btn-lg">
                <Mail size={18} />
                <span>{t("nav.contact", "İletişim")}</span>
              </Link>
            </div>

            {/* Quick Navigation Cards */}
            <div className="not-found__quick-links">
              <h3 className="not-found__quick-title">
                {"Popüler Sayfalarımız"}
              </h3>
              <div className="not-found__grid">
                <Link to="/karo-hali" className="not-found__quick-card">
                  <Grid size={22} className="not-found__qc-icon" />
                  <div>
                    <span className="not-found__qc-title">
                      {t("nav.karoHali", "Karo Halı")}
                    </span>
                    <span className="not-found__qc-desc">
                      {"Ofis ve ticari zemin çözümleri"}
                    </span>
                  </div>
                  <ArrowRight size={16} className="not-found__qc-arrow" />
                </Link>

                <Link to="/cim-hali" className="not-found__quick-card">
                  <Trees size={22} className="not-found__qc-icon" />
                  <div>
                    <span className="not-found__qc-title">
                      {t("nav.cimHali", "Çim Halı")}
                    </span>
                    <span className="not-found__qc-desc">
                      {"Peyzaj ve dış mekan çözümleri"}
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
        title={
          "Projeniz İçin Teklif Almak İster misiniz?"
        }
        subtitle={
          "Aradığınız sayfayı bulamamış olabilirsiniz ama projeniz için en uygun karo halı ve çim halı fiyat teklifini anında almak için bize ulaşabilirsiniz."
        }
      />
    </div>
  );
};

export default NotFound;
