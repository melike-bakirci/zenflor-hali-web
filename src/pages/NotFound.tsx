import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home as HomeIcon, Mail, ArrowRight, Grid, Trees, Compass } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';
import './NotFound.css';

const NotFound: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="not-found page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {isEn ? '404 - Page Not Found' : '404 - Sayfa Bulunamadı'}
            </h1>
            <p className="page-hero__subtitle">
              {isEn
                ? 'The page you are looking for does not exist or has been moved.'
                : 'Aradığınız sayfa silinmiş, değiştirilmiş veya adresi yanlış girilmiş olabilir.'}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Anasayfa', url: '/' },
            { label: '404' },
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
              {isEn ? 'Lost your way?' : 'Aradığınız Sayfayı Bulamadık'}
            </h2>

            <p className="not-found__desc">
              {isEn
                ? 'Sorry, the page you are trying to access does not exist on our site. You can return to our home page or explore our collections below.'
                : 'Üzgünüz, ulaşmaya çalıştığınız sayfa sitemizde yer almıyor. Ana sayfaya dönebilir veya koleksiyonlarımıza göz atabilirsiniz.'}
            </p>

            <div className="not-found__actions">
              <Link to="/" className="btn btn-primary btn-lg">
                <HomeIcon size={18} />
                <span>{t('common.backHome', 'Ana Sayfaya Dön')}</span>
              </Link>
              <Link to="/iletisim" className="btn btn-outline btn-lg">
                <Mail size={18} />
                <span>{t('nav.contact', 'İletişim')}</span>
              </Link>
            </div>

            {/* Quick Navigation Cards */}
            <div className="not-found__quick-links">
              <h3 className="not-found__quick-title">
                {isEn ? 'Popular Destinations' : 'Popüler Sayfalarımız'}
              </h3>
              <div className="not-found__grid">
                <Link to="/karo-hali" className="not-found__quick-card">
                  <Grid size={22} className="not-found__qc-icon" />
                  <div>
                    <span className="not-found__qc-title">{t('nav.karoHali', 'Karo Halı')}</span>
                    <span className="not-found__qc-desc">
                      {isEn ? 'Modular office flooring' : 'Ofis ve ticari zemin çözümleri'}
                    </span>
                  </div>
                  <ArrowRight size={16} className="not-found__qc-arrow" />
                </Link>

                <Link to="/cim-hali" className="not-found__quick-card">
                  <Trees size={22} className="not-found__qc-icon" />
                  <div>
                    <span className="not-found__qc-title">{t('nav.cimHali', 'Çim Halı')}</span>
                    <span className="not-found__qc-desc">
                      {isEn ? 'Synthetic grass solutions' : 'Peyzaj ve dış mekan çözümleri'}
                    </span>
                  </div>
                  <ArrowRight size={16} className="not-found__qc-arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
