import React from 'react';
import { useTranslation } from 'react-i18next';
import { Target, Eye, Leaf, Award, CheckCircle, Globe } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import Breadcrumb from '../components/ui/Breadcrumb';
import QuoteCtaBanner from '../components/ui/QuoteCtaBanner';
import usePageMeta from '../utils/usePageMeta';
import './About.css';

const VALUES = [
  { icon: <Award size={22} />, key: 'about.value1' },
  { icon: <CheckCircle size={22} />, key: 'about.value2' },
  { icon: <Leaf size={22} />, key: 'about.value3' },
  { icon: <Leaf size={22} />, key: 'about.value4' },
];

const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  usePageMeta({
    title: isEn ? 'About Us' : 'Hakkımızda',
    description: isEn
      ? 'Learn more about Zenflor - 20+ years of experience in modular carpet tiles and artificial grass flooring solutions.'
      : 'Zenflor hakkında bilgi edinin. 20 yılı aşkın tecrübe ile karo halı, çim halı ve kurumsal zemin çözümleri.',
  });

  return (
    <div className="about page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">{t('about.title')}</h1>
            <p className="page-hero__subtitle">{t('about.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Ana Sayfa', url: '/' },
            { label: t('nav.about') },
          ]}
        />
      </div>


      {/* Story */}
      <section className="section about__story">
        <div className="container about__story-grid">
          <div className="about__story-text">
            <SectionTitle
              title={t('about.story')}
            />
            <p className="about__para">{t('about.storyText1')}</p>
            <p className="about__para">{t('about.storyText2')}</p>

            <div className="about__story-stats">
              <div className="about__story-stat">
                <span className="about__story-stat-value">20</span>
                <span className="about__story-stat-label">{t('home.statsYears')}</span>
              </div>
              <div className="about__story-stat">
                <span className="about__story-stat-value">10.000+</span>
                <span className="about__story-stat-label">{t('home.statsProjects')}</span>
              </div>
              <div className="about__story-stat">
                <span className="about__story-stat-value">500+</span>
                <span className="about__story-stat-label">{t('home.statsProducts')}</span>
              </div>
            </div>
          </div>

          <div className="about__story-visual">
            <div className="about__story-card about__story-card--main">
              <div className="about__story-card-pattern" aria-hidden="true" />
              <div className="about__story-card-content">
                <span className="about__logo-big">ZenFlor</span>
                <span className="about__brand-text">Karo & Çim Halı Çözümleri</span>
                <span className="about__year-text">2005'ten beri...</span>
              </div>
            </div>
            <div className="about__story-card about__story-card--accent">
              <div className="about__web-links">
                {[1, 2, 3, 4].map((item) => (
                  <a
                    key={item}
                    href="https://mineflofiyatlar.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about__web-icon-link"
                    title="Mineflo & PVC Sitemiz"
                    aria-label="Mineflo & PVC Sitemiz"
                  >
                    <Globe size={26} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section about__mission-section">
        <div className="container">
          <SectionTitle
            title={t('about.missionTitle')}
            center
          />
          <div className="about__mv-grid">
            <div className="about__mv-card" id="mission-card">
              <div className="about__mv-icon">
                <Target size={32} />
              </div>
              <h2 className="about__mv-title">{isEn ? 'Mission' : 'Misyonumuz'}</h2>
              <p className="about__mv-text">{t('about.missionText')}</p>
            </div>
            <div className="about__mv-card" id="vision-card">
              <div className="about__mv-icon about__mv-icon--vision">
                <Eye size={32} />
              </div>
              <h2 className="about__mv-title">{isEn ? 'Vision' : 'Vizyonumuz'}</h2>
              <p className="about__mv-text">{t('about.visionText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about__values-section">
        <div className="container">
          <SectionTitle
            title={t('about.valuesTitle')}
            center
          />
          <div className="about__values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="about__value-item" id={`value-${i + 1}`}>
                <div className="about__value-icon">{v.icon}</div>
                <span className="about__value-label">{t(v.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA Banner */}
      <QuoteCtaBanner
        title={isEn ? 'Get a Quote for Your Corporate Flooring Projects!' : 'Kurumsal Zemin Projeleriniz İçin Teklif Alın!'}
        subtitle={
          isEn
            ? 'We offer the ideal flooring solution and quote for your commercial spaces with over 20 years of experience and expert team.'
            : '20 yılı aşkın tecrübemiz ve uzman ekibimizle ticari alanlarınız için en doğru zemin kaplama çözümünü ve teklifini sunuyoruz.'
        }
      />
    </div>
  );
};

export default About;
