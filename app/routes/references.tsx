import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReferenceCard from "~/components/ui/ReferenceCard";
import ReferenceModal from "~/components/ui/ReferenceModal";
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
    title: `Uygulama Galerisi | ${SITE_NAME}`,
    description: `${SITE_NAME} kurumsal zemin kaplama uygulama galerisi. Ofis, otel, hastane ve kurumsal projeler için bitmiş akustik karo halı ve suni çim halı uygulamalarımızın görselleri.`,
    canonicalUrl: "/galeri",
    keywords:
      "zemin kaplama galerisi, karo halı uygulama görselleri, çim halı fotoğrafları, ofis halısı uygulamaları, otel halısı fotoğrafları",
  });
}

const References: React.FC = () => {
  const { t } = useTranslation();
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
              {t("references.title")}
            </h1>
            <p className="page-hero__subtitle">
              {t("references.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: t("nav.home"), url: "/" },
            { label: t("references.title") },
          ]}
        />
      </div>

      {/* Finished Application Visual Gallery Section */}
      <section className="section references-gallery-sec" id="ref-gallery">
        <div className="container">
          {/* Grid */}
          <div className="grid-4 references-grid">
            {referenceProjects.map((project) => (
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
        title={t("references.quoteBannerTitle")}
        subtitle={t("references.quoteBannerSubtitle")}
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
