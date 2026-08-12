import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Building2,
  Award,
  Layers,
  PhoneCall,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import ReferenceCard from '../components/ui/ReferenceCard';
import ReferenceModal from '../components/ui/ReferenceModal';
import ClientLogos from '../components/ui/ClientLogos';
import Breadcrumb from '../components/ui/Breadcrumb';
import { referenceProjects, type ReferenceProject } from '../data/referencesData';
import usePageMeta from '../utils/usePageMeta';
import './References.css';

const References: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [selectedProject, setSelectedProject] = useState<ReferenceProject | null>(null);

  usePageMeta({
    title: isEn ? 'Our References & Completed Projects' : 'Referanslarımız ve Bitmiş Uygulamalar',
    description: isEn
      ? 'Zenflor corporate flooring references: finished carpet tile and artificial grass projects for offices, hotels, and architects.'
      : 'Zenflor kurumsal zemin kaplama referansları. Ofis, otel, mimar ve kurumsal projeler için bitmiş karo halı ve çim halı uygulamaları.',
  });

  return (
    <div className="references-page page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {isEn ? 'Our References' : 'Referanslarımız'}
            </h1>
            <p className="page-hero__subtitle">
              {isEn
                ? 'Corporate flooring solution references and finished application visuals'
                : 'Ofis, otel, plaza vb. projelerinde tamamlanan zemin kaplama uygulamalarımız ve kurumsal referanslarımız'}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Ana Sayfa', url: '/' },
            { label: isEn ? 'References' : 'Referanslarımız' },
          ]}
        />
      </div>

      {/* Corporate Clients Logos Section */}
      <section className="section references-clients-sec">
        <div className="container">
          <ClientLogos
            limit={4}
            title={isEn ? 'Our Corporate Partners & Clients' : 'Birlikte Çalıştığımız Kurumlar & Markalar'}
            subtitle={
              isEn
                ? 'Selected corporate clients who trust our carpet tile and flooring solutions'
                : 'Zemin çözümlerimizde bizi tercih eden seçkin şirket, otel ve mimarlık kurumları'
            }
            isEn={isEn}
          />
        </div>
      </section>

      {/* Finished Application Visual Gallery Section */}
      <section className="section references-gallery-sec" id="ref-gallery">
        <div className="container">
          <SectionTitle
            title={isEn ? 'Finished Application Visual Gallery' : 'Uygulama Galerisi'}
            subtitle={
              isEn
                ? 'Click on any image to view full resolution photo'
                : 'Fotoğrafların üzerine tıklayarak yüksek çözünürlüklü olarak inceleyebilirsiniz'
            }
            center
          />

          {/* Grid */}
          <div className="grid-4 references-grid">
            {referenceProjects.slice(0, 4).map((project) => (
              <ReferenceCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
                isEn={isEn}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Call To Action Banner */}
      <section className="references-cta">
        <div className="container references-cta__inner">
          <div className="references-cta__content">
            <h2 className="references-cta__title">
              {isEn ? 'Planning a Flooring Project for Your Office or Hotel?' : 'Ofisiniz veya Oteliniz İçin Zemin Projeniz mi Var?'}
            </h2>
            <p className="references-cta__desc">
              {isEn
                ? 'Get free on-site measurement, physical carpet tile samples, and expert quote for your corporate projects.'
                : 'Kurumsal projeleriniz için ücretsiz yerinde keşif, fiziksel karo halı numune gönderimi ve özel teklif alın.'}
            </p>
            <div className="references-cta__features">
              <div className="ref-cta-feat">
                <CheckCircle size={16} />
                <span>Ücretsiz Yerinde Keşif</span>
              </div>
              <div className="ref-cta-feat">
                <CheckCircle size={16} />
                <span>Fiziksel Numune Kataloğu</span>
              </div>
              <div className="ref-cta-feat">
                <CheckCircle size={16} />
                <span>Profesyonel Montaj Hizmeti</span>
              </div>
            </div>
          </div>

          <div className="references-cta__actions">
            <Link to="/iletisim" className="btn btn-primary btn-lg references-cta__btn">
              <PhoneCall size={18} />
              <span>{isEn ? 'Get Project Quote' : 'Proje Teklifi Alın'}</span>
            </Link>
            <a
              href="tel:+905302708487"
              className="btn btn-outline references-cta__phone"
            >
              <span>+90 530 270 84 87</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox / Modal */}
      <ReferenceModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isEn={isEn}
      />
    </div>
  );
};

export default References;
