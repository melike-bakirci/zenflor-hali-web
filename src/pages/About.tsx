import React from 'react';
import { useTranslation } from 'react-i18next';
import { Target, Eye, Leaf, Award, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import './About.css';

const VALUES = [
  { icon: <Award size={22} />, key: 'about.value1' },
  { icon: <CheckCircle size={22} />, key: 'about.value2' },
  { icon: <Leaf size={22} />, key: 'about.value3' },
  { icon: <Leaf size={22} />, key: 'about.value4' },
];

const TEAM = [
  { name: 'Ahmet Yılmaz', role: 'Genel Müdür', roleEn: 'General Manager' },
  { name: 'Fatma Kaya', role: 'Satış Direktörü', roleEn: 'Sales Director' },
  { name: 'Mehmet Demir', role: 'Teknik Müdür', roleEn: 'Technical Manager' },
  { name: 'Zeynep Arslan', role: 'Tasarım Uzmanı', roleEn: 'Design Specialist' },
];

const CERTS = [
  'ISO 9001:2015 Kalite Yönetim Sistemi',
  'ISO 14001:2015 Çevre Yönetim Sistemi',
  'Woolmark Lisanslı Üretici',
  'LEED v4 Uyumlu Ürün Sertifikası',
  'TSE Belgeli Ürünler',
  'Türk Loydu Onaylı',
];

const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="about page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <span className="badge badge-primary">
              {isEn ? 'Since 2005' : '2005\'ten Beri'}
            </span>
            <h1 className="page-hero__title font-display">{t('about.title')}</h1>
            <p className="page-hero__subtitle">{t('about.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="section about__story">
        <div className="container about__story-grid">
          <div className="about__story-text">
            <SectionTitle
              tag={isEn ? 'Our Story' : 'Hikayemiz'}
              title={t('about.story')}
            />
            <p className="about__para">{t('about.storyText1')}</p>
            <p className="about__para">{t('about.storyText2')}</p>

            <div className="about__story-stats">
              <div className="about__story-stat">
                <span className="about__story-stat-value">20+</span>
                <span className="about__story-stat-label">{t('home.statsYears')}</span>
              </div>
              <div className="about__story-stat">
                <span className="about__story-stat-value">2.500+</span>
                <span className="about__story-stat-label">{t('home.statsProjects')}</span>
              </div>
              <div className="about__story-stat">
                <span className="about__story-stat-value">80+</span>
                <span className="about__story-stat-label">{t('home.statsProducts')}</span>
              </div>
            </div>
          </div>

          <div className="about__story-visual">
            <div className="about__story-card about__story-card--main">
              <div className="about__story-card-pattern" aria-hidden="true" />
              <div className="about__story-card-content">
                <span className="about__logo-big">K</span>
                <span className="about__brand-text">KARO HALI</span>
                <span className="about__year-text">EST. 2005</span>
              </div>
            </div>
            <div className="about__story-card about__story-card--accent">
              <p className="about__quote">
                {isEn
                  ? '"Quality in every square centimeter."'
                  : '"Her santimetrekarede kalite."'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section about__mission-section">
        <div className="container">
          <SectionTitle
            tag={isEn ? 'Mission & Vision' : 'Misyon & Vizyon'}
            title={t('about.missionTitle')}
            center
          />
          <div className="about__mv-grid">
            <div className="about__mv-card" id="mission-card">
              <div className="about__mv-icon">
                <Target size={32} />
              </div>
              <h2 className="about__mv-title">{isEn ? 'Mission' : 'Misyon'}</h2>
              <p className="about__mv-text">{t('about.missionText')}</p>
            </div>
            <div className="about__mv-card" id="vision-card">
              <div className="about__mv-icon about__mv-icon--vision">
                <Eye size={32} />
              </div>
              <h2 className="about__mv-title">{isEn ? 'Vision' : 'Vizyon'}</h2>
              <p className="about__mv-text">{t('about.visionText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about__values-section">
        <div className="container">
          <SectionTitle
            tag={isEn ? 'Values' : 'Değerler'}
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

      {/* Team */}
      <section className="section about__team-section">
        <div className="container">
          <SectionTitle
            tag={isEn ? 'Team' : 'Ekip'}
            title={t('about.teamTitle')}
            center
          />
          <div className="about__team-grid">
            {TEAM.map((member, i) => (
              <div key={i} className="about__team-card" id={`team-member-${i + 1}`}>
                <div className="about__team-avatar">
                  <span>{member.name.charAt(0)}</span>
                </div>
                <h3 className="about__team-name">{member.name}</h3>
                <p className="about__team-role">{isEn ? member.roleEn : member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="section about__certs-section">
        <div className="container">
          <SectionTitle
            tag={isEn ? 'Certificates' : 'Belgeler'}
            title={t('about.certTitle')}
            center
          />
          <div className="about__certs-grid">
            {CERTS.map((cert, i) => (
              <div key={i} className="about__cert-item" id={`cert-${i + 1}`}>
                <CheckCircle size={20} className="about__cert-icon" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
