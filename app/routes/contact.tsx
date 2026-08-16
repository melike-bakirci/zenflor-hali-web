import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import SectionTitle from "~/components/ui/SectionTitle";
import Breadcrumb from "~/components/ui/Breadcrumb";
import QuoteCtaBanner from "~/components/ui/QuoteCtaBanner";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME, SITE_URL } from "~/lib/constants";
import "./contact.css";

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const TiktokIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const checkWorkingHours = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1-6 = Mon-Sat
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const openMinutes = 9 * 60; // 09:00
  const closeMinutes = 19 * 60; // 19:00

  if (day === 0) {
    return false;
  }

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
};

export function meta() {
  return seoMeta({
    title: `İletişim & Adres Bilgileri | ${SITE_NAME}`,
    description: `${SITE_NAME} İstanbul Sancaktepe Sarıgazi merkez ofisi ile iletişime geçin. Karo halı ve çim halı numune talepleri, adres ve Türkiye geneli projelerinize özel fiyat teklifleri.`,
    canonicalUrl: "/iletisim",
    keywords:
      "zenflor iletişim, karo halı telefon, çim halı iletişim, zemin kaplama iletişim, sancaktepe karo halı, sarıgazi halı firmaları, istanbul zemin kaplama",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: SITE_NAME,
      image: `${SITE_URL}/logo-nobg.png`,
      telephone: "+905302708487",
      email: "zenflormarket@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Leman Sk. No:4",
        addressLocality: "Sancaktepe",
        addressRegion: "İstanbul",
        addressCountry: "TR",
      },
      url: SITE_URL,
    },
  });
}

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(checkWorkingHours);

  useEffect(() => {
    const updateStatus = () => {
      setIsOpen(checkWorkingHours());
    };
    const timer = setInterval(updateStatus, 30000);
    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GOOGLE_FORM_URL =
      "https://docs.google.com/forms/d/e/1FAIpQLSczeA1IJbeRlC25dY_Mdk83-UWVmHIqcF4aXux-h28dwogWAQ/formResponse";

    const formBody = new URLSearchParams();
    formBody.append("entry.2005620554", formData.name);
    formBody.append("entry.1166974658", formData.phone);
    formBody.append("entry.839337160", formData.message);

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: "", phone: "", message: "" });

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Form gönderim hatası:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {t("contact.title")}
            </h1>
            <p className="page-hero__subtitle">{t("contact.subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", url: "/" },
            { label: t("nav.contact") },
          ]}
        />
      </div>

      <section className="section contact__section">
        <div className="container contact__grid">
          {/* Info */}
          <div className="contact__info">
            <SectionTitle
              title={"İletişim Bilgilerimiz"}
            />

            <div className="contact__info-list">
              <a
                href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__info-item card"
                aria-label="Google Haritalar'da Adresimizi Açın"
              >
                <div className="contact__info-icon">
                  <MapPin size={22} />
                </div>
                <div className="contact__info-content">
                  <h3 className="contact__info-title">
                    {t("contact.address")}
                  </h3>
                  <p className="contact__info-desc">
                    Leman Sk. No:4, Sancaktepe/İstanbul
                  </p>
                </div>
              </a>

              <a
                href="tel:+905302708487"
                className="contact__info-item card"
                aria-label="Telefon ile Bizi Arayın: +90 530 270 84 87"
              >
                <div className="contact__info-icon">
                  <Phone size={22} />
                </div>
                <div className="contact__info-content">
                  <h3 className="contact__info-title">{t("contact.phone")}</h3>
                  <p className="contact__info-desc">+90 (530) 270 84 87</p>
                </div>
              </a>

              <a
                href="mailto:zenflormarket@gmail.com"
                className="contact__info-item card"
                aria-label="E-posta Gönderin: zenflormarket@gmail.com"
              >
                <div className="contact__info-icon">
                  <Mail size={22} />
                </div>
                <div className="contact__info-content">
                  <h3 className="contact__info-title">{t("contact.email")}</h3>
                  <p className="contact__info-desc">zenflormarket@gmail.com</p>
                </div>
              </a>

              <div className="contact__info-item contact__info-item--hours card">
                <div className="contact__info-icon">
                  <Clock size={22} />
                </div>
                <div className="contact__info-body">
                  <div className="contact__info-header">
                    <h3 className="contact__info-title">
                      {t("contact.hours")}
                    </h3>
                    <span
                      className={`contact__status-badge ${isOpen ? "contact__status-badge--open" : "contact__status-badge--closed"}`}
                    >
                      <span className="contact__status-dot" />
                      {isOpen ? t("contact.openNow") : t("contact.closedNow")}
                    </span>
                  </div>
                  <p className="contact__info-desc">
                    {t("contact.hoursValue")}
                  </p>
                  <p className="contact__info-desc contact__info-desc--muted">
                    {t("contact.sundayHours")}
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="contact__socials-card card">
                <h3 className="contact__info-title contact__socials-title">
                  {t("contact.followUs")}
                </h3>
                <div className="contact__socials-grid">
                  <a
                    href="https://www.instagram.com/zenflormarket/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link contact__social-link--instagram"
                    aria-label="Instagram sayfamızı ziyaret edin"
                    title="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="http://linkedin.com/company/zenflor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link contact__social-link--linkedin"
                    aria-label="LinkedIn sayfamızı ziyaret edin"
                    title="LinkedIn"
                  >
                    <LinkedinIcon />
                  </a>
                  <a
                    href="https://www.facebook.com/people/Zenflor/61592694338862/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link contact__social-link--facebook"
                    aria-label="Facebook sayfamızı ziyaret edin"
                    title="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://www.youtube.com/@zenflormarket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link contact__social-link--youtube"
                    aria-label="YouTube kanalımızı ziyaret edin"
                    title="YouTube"
                  >
                    <YoutubeIcon />
                  </a>
                  <a
                    href="https://www.tiktok.com/@zenflormarket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link contact__social-link--tiktok"
                    aria-label="TikTok sayfamızı ziyaret edin"
                    title="TikTok"
                  >
                    <TiktokIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact__form-wrapper card">
            {success ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <SectionTitle
                  title={"Mesajınız Alındı!"}
                />
                <p className="contact__success-text">
                  {t("contact.successMsg")}
                </p>
              </div>
            ) : (
              <>
                <SectionTitle
                  title={"Bize Ulaşın"}
                />
                <form className="contact__form" onSubmit={handleSubmit}>
                  <div className="contact__form-row">
                    <div className="contact__form-group">
                      <label htmlFor="name" className="contact__label">
                        {t("contact.nameLabel")} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="contact__input"
                        placeholder={t("contact.namePlaceholder")}
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="contact__form-group">
                      <label htmlFor="phone" className="contact__label">
                        {t("contact.phoneLabel")} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        inputMode="tel"
                        autoComplete="tel"
                        className="contact__input"
                        placeholder={t("contact.phonePlaceholder")}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact__form-group">
                    <label htmlFor="message" className="contact__label">
                      {t("contact.messageLabel")} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="contact__input contact__textarea"
                      placeholder={t("contact.messagePlaceholder")}
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg contact__submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      t("common.loading")
                    ) : (
                      <>
                        <span>{t("contact.sendBtn")}</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contact__map" aria-label="Harita Konumu">
        <iframe
          title={`${SITE_NAME} Google Maps Konumu`}
          src="https://maps.google.com/maps?q=Leman+Sk.+No:4,+Sancaktepe/İstanbul&t=&z=18&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Quote CTA Banner */}
      <QuoteCtaBanner
        title={
          "Projeniz İçin Doğrudan Teklif Alın!"
        }
        subtitle={
          "Müşteri temsilcimizle görüşmek ve anında teklif almak için telefon hattımızdan veya WhatsApp üzerinden bize ulaşın."
        }
      />
    </div>
  );
};

export default Contact;
