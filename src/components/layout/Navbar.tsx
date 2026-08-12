import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/hakkimizda', label: t('nav.about') },
    { to: '/karo-hali', label: t('nav.karoHali') },
    { to: '/cim-hali', label: t('nav.cimHali') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/iletisim', label: t('nav.contact') },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="Karo Halı Ana Sayfa">
          <span className="navbar__logo-icon">K</span>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">KARO HALI</span>
            <span className="navbar__logo-tagline">Premium Zemin Çözümleri</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Ana navigasyon">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <LanguageSwitcher />
          <Link to="/iletisim" className="btn btn-primary navbar__cta">
            {t('products.infoRequest')}
          </Link>
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menüyü aç/kapat"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar__mobile" role="dialog" aria-modal="true">
          <nav className="navbar__mobile-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="navbar__mobile-bottom">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
