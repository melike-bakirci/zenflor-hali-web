import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">K</span>
              <div>
                <span className="footer__logo-name">KARO HALI</span>
                <p className="footer__slogan">{t('footer.slogan')}</p>
              </div>
            </Link>
            <p className="footer__about">
              Karo halı ve çim halı alanında 20 yılı aşkın deneyimimizle kurumsal ve bireysel projelere en kaliteli zemin çözümlerini sunuyoruz.
            </p>
            <div className="footer__socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
                IG
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link">
                IN
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
                FB
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h3 className="footer__col-title">{t('footer.quickLinks')}</h3>
            <nav className="footer__nav" aria-label="Footer navigasyon">
              <Link to="/" className="footer__nav-link">{t('nav.home')}</Link>
              <Link to="/hakkimizda" className="footer__nav-link">{t('nav.about')}</Link>
              <Link to="/karo-hali" className="footer__nav-link">{t('nav.karoHali')}</Link>
              <Link to="/cim-hali" className="footer__nav-link">{t('nav.cimHali')}</Link>
              <Link to="/blog" className="footer__nav-link">{t('nav.blog')}</Link>
              <Link to="/iletisim" className="footer__nav-link">{t('nav.contact')}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h3 className="footer__col-title">{t('contact.title')}</h3>
            <address className="footer__contact-list">
              <div className="footer__contact-item">
                <MapPin size={16} className="footer__contact-icon" />
                <span>Bağcılar Organize Sanayi, İstanbul, Türkiye</span>
              </div>
              <div className="footer__contact-item">
                <Phone size={16} className="footer__contact-icon" />
                <a href="tel:+902121234567">+90 (212) 123 45 67</a>
              </div>
              <div className="footer__contact-item">
                <Mail size={16} className="footer__contact-icon" />
                <a href="mailto:info@karohali.com.tr">info@karohali.com.tr</a>
              </div>
              <div className="footer__contact-item">
                <Clock size={16} className="footer__contact-icon" />
                <span>{t('contact.hoursValue')}</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {year} Karo Halı. {t('footer.rights')}
          </p>
          <div className="footer__legal">
            <Link to="/gizlilik" className="footer__legal-link">{t('footer.privacy')}</Link>
            <span className="footer__legal-sep">·</span>
            <Link to="/kosullar" className="footer__legal-link">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
