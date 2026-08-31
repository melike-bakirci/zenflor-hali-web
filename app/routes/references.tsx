import React, { useState } from "react";
import { useSearchParams } from "react-router";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("kategori") || "all";
  const [selectedProject, setSelectedProject] =
    useState<ReferenceProject | null>(null);

  const handleCategoryChange = (cat: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === "all") {
      nextParams.delete("kategori");
    } else {
      nextParams.set("kategori", cat);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const filteredProjects = referenceProjects.filter((project) => {
    if (selectedCategory === "karo-hali") {
      return (
        project.productType.toLowerCase().includes("karo") ||
        project.category === "office" ||
        project.category === "hotel"
      );
    }
    if (selectedCategory === "cim-hali") {
      return (
        project.productType.toLowerCase().includes("çim") ||
        project.productType.toLowerCase().includes("cim") ||
        project.category === "landscape"
      );
    }
    return true;
  });

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
          {/* Category Filter Tabs */}
          <div className="references-category-tabs">
            <button
              type="button"
              className={`references-category-tab ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategoryChange("all")}
            >
              {t("references.filterAll")}
            </button>
            <button
              type="button"
              className={`references-category-tab ${selectedCategory === "karo-hali" ? "active" : ""}`}
              onClick={() => handleCategoryChange("karo-hali")}
            >
              {t("references.filterKaro")}
            </button>
            <button
              type="button"
              className={`references-category-tab ${selectedCategory === "cim-hali" ? "active" : ""}`}
              onClick={() => handleCategoryChange("cim-hali")}
            >
              {t("references.filterCim")}
            </button>
          </div>

          {/* Grid */}
          <div className="references-grid">
            {filteredProjects.map((project) => (
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
