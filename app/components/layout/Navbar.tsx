import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Menu, X, Home, Phone, ArrowRight, Clock } from "lucide-react";
import { SITE_NAME, SAHIBINDEN_URL } from "~/lib/constants";
import SahibindenIcon from "~/components/ui/SahibindenIcon";
import "./Navbar.css";

const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 14,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const navLinks = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/hakkimizda", label: t("nav.about") },
    { to: "/karo-hali", label: t("nav.karoHali") },
    { to: "/cim-hali", label: t("nav.cimHali") },
    { to: "/galeri", label: t("nav.references") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/iletisim", label: t("nav.contact") },
  ];

  return (
    <header
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      role="banner"
    >
      {/* Top Dark Bar */}
      <div className="navbar__topbar">
        <div className="navbar__topbar-inner container">
          <div className="navbar__topbar-left">
            <a
              href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__topbar-item"
              title={t("contact.address")}
            >
              <Home size={14} />
              <span>{t("nav.address")}</span>
            </a>
            <a
              href="tel:+905302708487"
              className="navbar__topbar-item"
              title={t("nav.callUs")}
            >
              <Phone size={14} />
              <span>{t("contact.phoneValue")}</span>
            </a>
            <a
              href="https://wa.me/905302708487"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__topbar-item navbar__topbar-whatsapp"
              title={t("nav.whatsappContact")}
            >
              <WhatsAppIcon size={14} />
              <span>WhatsApp</span>
            </a>
            <a
              href={SAHIBINDEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__topbar-item navbar__topbar-sahibinden"
              title="Sahibinden"
            >
              <SahibindenIcon size={14} />
              <span>Sahibinden</span>
            </a>
          </div>
        </div>
      </div>

      <div className="navbar__main">
        <div className="navbar__main-inner container">
          <div className="navbar__brand-wrapper">
            <Link
              to="/"
              className="navbar__logo"
              aria-label={`${SITE_NAME} ${t("nav.home")}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="/logo-nobg.png"
                alt={`${SITE_NAME} Logo`}
                className="navbar__logo-img"
              />
              <div className="navbar__logo-text">
                <span className="navbar__logo-name">{SITE_NAME}</span>
                <span className="navbar__logo-tagline">
                  {t("nav.tagline")}
                </span>
              </div>
            </Link>
          </div>

          <div className="navbar__nav-wrapper">
            <nav className="navbar__links" aria-label="Ana navigasyon">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? "navbar__link--active" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                  {index < navLinks.length - 1 && (
                    <span className="navbar__separator">•</span>
                  )}
                </React.Fragment>
              ))}
            </nav>

            <button
              className="navbar__mobile-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label={t("nav.openCloseMenu")}
              aria-expanded={mobileOpen}
              id="mobile-menu-toggle"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`navbar__drawer-backdrop ${mobileOpen ? "navbar__drawer-backdrop--open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel (Slides from Right) */}
      <aside
        className={`navbar__drawer ${mobileOpen ? "navbar__drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobil Menü"
      >
        {/* Drawer Header */}
        <div className="navbar__drawer-header">
          <Link
            to="/"
            className="navbar__drawer-logo"
            onClick={() => setMobileOpen(false)}
            aria-label={`${SITE_NAME} ${t("nav.home")}`}
          >
            <img
              src="/logo-nobg.png"
              alt={`${SITE_NAME} Logo`}
              className="navbar__drawer-logo-img"
            />
            <div className="navbar__drawer-logo-text">
              <span className="navbar__drawer-logo-name">{SITE_NAME}</span>
              <span className="navbar__drawer-logo-tagline">
                {t("nav.tagline")}
              </span>
            </div>
          </Link>
          <button
            className="navbar__drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Menüyü Kapat"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="navbar__drawer-body">
          <nav className="navbar__drawer-nav" aria-label="Mobil navigasyon">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `navbar__drawer-link ${isActive ? "navbar__drawer-link--active" : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <span className="navbar__drawer-link-text">{link.label}</span>
                <ArrowRight size={18} className="navbar__drawer-link-arrow" />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Drawer Footer Contact Info */}
        <div className="navbar__drawer-footer">
          <div className="navbar__drawer-contact-list">
            <a
              href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__drawer-contact-item"
            >
              <Home size={16} className="navbar__drawer-contact-icon" />
              <span>{t("nav.address")}</span>
            </a>

            <a
              href="tel:+905302708487"
              className="navbar__drawer-contact-item"
            >
              <Phone size={16} className="navbar__drawer-contact-icon" />
              <span>{t("contact.phoneValue")}</span>
            </a>

            <a
              href="https://wa.me/905302708487"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__drawer-contact-item"
            >
              <WhatsAppIcon size={16} className="navbar__drawer-contact-icon" />
              <span>WhatsApp</span>
            </a>

            <a
              href={SAHIBINDEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__drawer-contact-item"
            >
              <SahibindenIcon size={16} className="navbar__drawer-contact-icon" />
              <span>Sahibinden</span>
            </a>

            <div className="navbar__drawer-contact-item navbar__drawer-contact-item--text">
              <Clock size={16} className="navbar__drawer-contact-icon" />
              <span>{t("contact.hoursValue")}</span>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
