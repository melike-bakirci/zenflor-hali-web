import React from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import SectionTitle from "~/components/ui/SectionTitle";
import BlogCard from "~/components/ui/BlogCard";
import Breadcrumb from "~/components/ui/Breadcrumb";
import QuoteCtaBanner from "~/components/ui/QuoteCtaBanner";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME } from "~/lib/constants";
import { blogPosts } from "~/data/blogPosts";
import "./blog.css";

export function meta() {
  return seoMeta({
    title: `Zemin Kaplama Blog & Dekorasyon Fikirleri | ${SITE_NAME}`,
    description:
      "Karo halı fiyatları, çim halı modelleri, zemin kaplama uygulamaları ve dekorasyon dünyasından güncel haberler, rehberler ve montaj ipuçları.",
    canonicalUrl: "/blog",
    keywords:
      "zemin kaplama blog, karo halı rehberi, çim halı nasıl serilir, ofis dekorasyon fikirleri, zemin kaplama trendleri",
  });
}

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam =
    searchParams.get("kategori") || searchParams.get("category") || "all";
  const selectedCategory =
    categoryParam === "karo-hali" || categoryParam === "cim-hali"
      ? categoryParam
      : "all";

  const handleCategoryChange = (cat: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("category");
    if (cat === "all") {
      nextParams.delete("kategori");
    } else {
      nextParams.set("kategori", cat);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory === "karo-hali") {
      return post.category === "Karo Halı";
    }
    if (selectedCategory === "cim-hali") {
      return post.category === "Çim Halı";
    }
    return true;
  });

  return (
    <div className="blog page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">{t("blog.title")}</h1>
            <p className="page-hero__subtitle">{t("blog.subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: t("nav.home"), url: "/" },
            { label: t("nav.blog") },
          ]}
        />
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle title={t("blog.recentPosts")} />

          <div className="blog-category-tabs">
            <button
              type="button"
              className={`blog-category-tab ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategoryChange("all")}
            >
              {t("blog.allCategories")}
            </button>
            <button
              type="button"
              className={`blog-category-tab ${selectedCategory === "karo-hali" ? "active" : ""}`}
              onClick={() => handleCategoryChange("karo-hali")}
            >
              {t("nav.karoHali")}
            </button>
            <button
              type="button"
              className={`blog-category-tab ${selectedCategory === "cim-hali" ? "active" : ""}`}
              onClick={() => handleCategoryChange("cim-hali")}
            >
              {t("nav.cimHali")}
            </button>
          </div>

          <div className="grid-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA Banner */}
      <QuoteCtaBanner
        title={t("blog.quoteBannerTitle")}
        subtitle={t("blog.quoteBannerSubtitle")}
      />
    </div>
  );
};

export default Blog;
