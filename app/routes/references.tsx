import React, { useState } from "react";
import SectionTitle from "~/components/ui/SectionTitle";
import ReferenceCard from "~/components/ui/ReferenceCard";
import ReferenceModal from "~/components/ui/ReferenceModal";
import ClientLogos from "~/components/ui/ClientLogos";
import Breadcrumb from "~/components/ui/Breadcrumb";
import QuoteCtaBanner from "~/components/ui/QuoteCtaBanner";
import {
  referenceProjects,
  type ReferenceProject,
} from "~/data/referencesData";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME } from "~/lib/constants";
import "./references.css";

export function meta() {
  return seoMeta({
    title: `Kurumsal Zemin Kaplama Referanslarımız | ${SITE_NAME}`,
    description: `${SITE_NAME} kurumsal zemin kaplama referansları. Ofis, otel, hastane ve kurumsal projeler için ucuz, uygun ve profesyonel bitmiş akustik karo halı ve suni çim halı uygulamaları.`,
    canonicalUrl: "/referanslarimiz",
    keywords:
      "zemin kaplama referansları, ucuz karo halı referansları, uygun ofis halısı, otel halısı uygulamaları, ticari zemin kaplama referanslar",
  });
}

const References: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    useState<ReferenceProject | null>(null);

  return (
    <div className="references-page page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {"Referanslarımız"}
            </h1>
            <p className="page-hero__subtitle">
              {"Ofis, otel vb. projelerde tamamlanan zemin kaplama uygulamalarımız ve referanslarımız"}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", url: "/" },
            { label: "Referanslarımız" },
          ]}
        />
      </div>

      {/* Corporate Clients Logos Section */}
      <section className="section references-clients-sec">
        <div className="container">
          <ClientLogos
            limit={4}
            title={
              "Değerli Müşterilerimiz"
            }
            subtitle={
              "Zemin çözümlerimizde bizi tercih eden seçkin şirket, otel ve mimarlık kurumları"
            }
          />
        </div>
      </section>

      {/* Finished Application Visual Gallery Section */}
      <section className="section references-gallery-sec" id="ref-gallery">
        <div className="container">
          <SectionTitle
            title={
              "Uygulama Galerisi"
            }
            subtitle={
              "Fotoğrafların üzerine tıklayarak yüksek çözünürlüklü olarak inceleyebilirsiniz"
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA Banner */}
      <QuoteCtaBanner
        title={
          "Sizin Projeniz İçin De Teklif Hazırlayalım!"
        }
        subtitle={
          "Tamamladığımız yüzlerce kurumsal zemin projesi gibi, alanınıza özel ücretsiz yerinde keşif, numune kataloğu ve en uygun fiyat teklifi fırsatından yararlanın."
        }
      />

      {/* Lightbox / Modal */}
      <ReferenceModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default References;
