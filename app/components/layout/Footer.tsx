import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE_NAME, SAHIBINDEN_URL } from "~/lib/constants";
import SahibindenIcon from "~/components/ui/SahibindenIcon";
import "./Footer.css";

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const TiktokIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link
              to="/"
              className="footer__logo"
              aria-label={`${SITE_NAME} ${t("nav.home")}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="/logo-nobg.png"
                alt={`${SITE_NAME} Logo`}
                className="footer__logo-img"
              />
              <div className="footer__logo-text">
                <span className="footer__logo-name">{SITE_NAME}</span>
                <span className="footer__slogan">{t("footer.slogan")}</span>
              </div>
            </Link>
            <p className="footer__about">
              {t("footer.aboutText")}
            </p>
            <div className="footer__socials">
              <a
                href="https://www.instagram.com/zenflormarket/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer__social-link"
                title="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="http://linkedin.com/company/zenflor"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer__social-link"
                title="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.facebook.com/people/Zenflor/61592694338862/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="footer__social-link"
                title="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.youtube.com/@zenflormarket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="footer__social-link"
                title="YouTube"
              >
                <YoutubeIcon />
              </a>
              <a
                href="https://www.tiktok.com/@zenflormarket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="footer__social-link"
                title="TikTok"
              >
                <TiktokIcon />
              </a>
              <a
                href={SAHIBINDEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="sahibinden.com"
                className="footer__social-link footer__social-link--sahibinden"
                title="sahibinden.com Mağazamız"
              >
                <SahibindenIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col footer__col--links">
            <h3 className="footer__col-title">{t("footer.quickLinks")}</h3>
            <nav className="footer__nav" aria-label="Footer navigasyon">
              <Link to="/" className="footer__nav-link">
                {t("nav.home")}
              </Link>
              <Link to="/hakkimizda" className="footer__nav-link">
                {t("nav.about")}
              </Link>
              <Link to="/karo-hali" className="footer__nav-link">
                {t("nav.karoHali")}
              </Link>
              <Link to="/cim-hali" className="footer__nav-link">
                {t("nav.cimHali")}
              </Link>
              <Link to="/referanslarimiz" className="footer__nav-link">
                {t("nav.references")}
              </Link>
              <Link to="/blog" className="footer__nav-link">
                {t("nav.blog")}
              </Link>
              <Link to="/iletisim" className="footer__nav-link">
                {t("nav.contact")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer__col footer__col--contact">
            <h3 className="footer__col-title">{t("contact.title")}</h3>
            <address className="footer__contact-list">
              <div className="footer__contact-item">
                <MapPin size={16} className="footer__contact-icon" />
                <a
                  href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("contact.addressValue")}
                </a>
              </div>
              <div className="footer__contact-item">
                <Phone size={16} className="footer__contact-icon" />
                <a href="tel:+905302708487">{t("contact.phoneValue")}</a>
              </div>
              <div className="footer__contact-item">
                <Mail size={16} className="footer__contact-icon" />
                <a href="mailto:zenflormarket@gmail.com">
                  {t("contact.emailValue")}
                </a>
              </div>
              <div className="footer__contact-item">
                <Clock size={16} className="footer__contact-icon" />
                <span>{t("contact.hoursValue")}</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {year} {SITE_NAME} Karo & Çim Halı. {t("footer.rights")}
          </p>
          <div className="footer__legal">
            <Link to="/gizlilik" className="footer__legal-link">
              {t("footer.privacy")}
            </Link>
            <span className="footer__legal-sep">·</span>
            <Link to="/kosullar" className="footer__legal-link">
              {t("footer.terms")}
            </Link>
            <span className="footer__legal-sep">·</span>
            <Link to="/kvkk" className="footer__legal-link">
              {t("footer.kvkk")}
            </Link>
            <span className="footer__legal-sep">·</span>
            <Link to="/cerez-politikasi" className="footer__legal-link">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
