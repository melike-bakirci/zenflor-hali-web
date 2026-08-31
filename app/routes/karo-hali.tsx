import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import ProductCard from "~/components/ui/ProductCard";
import Breadcrumb from "~/components/ui/Breadcrumb";
import Pagination from "~/components/ui/Pagination";
import ProductFilterBar from "~/components/ui/ProductFilterBar";
import ProductSidebarFilter from "~/components/ui/ProductSidebarFilter";
import ActiveFilters from "~/components/ui/ActiveFilters";
import { karoHaliProducts } from "~/data/karoHaliProducts";
import {
  filterAndSortProducts,
  parseFilterParams,
  filtersToSearchParams,
  type FilterState,
  type SortOption,
} from "~/utils/productUtils";
import QuoteCtaBanner from "~/components/ui/QuoteCtaBanner";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME, SITE_URL } from "~/lib/constants";
import "./product-list.css";

const ITEMS_PER_PAGE = 12;

export function meta() {
  return seoMeta({
    title: `Ticari ve Ofis Karo Halı Modelleri & Fiyatları | ${SITE_NAME}`,
    description:
      "Yüksek yaya trafiğine dayanıklı ofis karo halı modelleri. İstanbul Sancaktepe ve Sarıgazi dahil tüm Türkiye'ye en uygun karo halı m² fiyatları ve zemin kaplama çözümleri.",
    canonicalUrl: "/karo-hali",
    keywords:
      "ticari karo halı, ofis karo halı fiyatları, istanbul karo halı, sancaktepe ofis halısı, sarıgazi zemin kaplama, yanmaz karo halı, antistatik halı, karo halı m2 fiyatı",
    breadcrumbs: [
      { label: "Ana Sayfa", url: "/" },
      { label: "Karo Halı", url: "/karo-hali" },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Ticari ve Ofis Karo Halı Modelleri & Fiyatları | ${SITE_NAME}`,
      description:
        "Yüksek yaya trafiğine dayanıklı ofis karo halı modelleri. İstanbul Sancaktepe ve Sarıgazi dahil tüm Türkiye'ye en uygun karo halı m² fiyatları ve zemin kaplama çözümleri.",
      url: `${SITE_URL}/karo-hali`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: karoHaliProducts.length,
        itemListElement: karoHaliProducts.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `${SITE_URL}/karo-hali/${product.slug}`,
          image: product.image ? `${SITE_URL}${product.image}` : undefined,
        })),
      },
    },
  });
}

const KaroHali: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { filters, currentPage } = useMemo(() => {
    return parseFilterParams(searchParams);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(karoHaliProducts, filters);
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const updateFilters = (newFilters: FilterState) => {
    const nextParams = filtersToSearchParams(newFilters, 1);
    setSearchParams(nextParams, { replace: true });
  };

  const handleSearchChange = (query: string) => {
    updateFilters({ ...filters, searchQuery: query });
  };

  const handleSortChange = (sort: SortOption) => {
    updateFilters({ ...filters, sortOption: sort });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    updateFilters(newFilters);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handlePageChange = (page: number) => {
    const nextParams = filtersToSearchParams(filters, page);
    setSearchParams(nextParams, { replace: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="product-list page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {t("products.karoHali")}
            </h1>
            <p className="page-hero__subtitle">
              {t("products.karoHaliSubtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: t("nav.home"), url: "/" },
            { label: t("products.karoHali") },
          ]}
        />
      </div>

      {/* Products */}
      <section className="section">
        <div className="container">
          <div className="product-page-layout">
            {/* Left Sidebar Filter Bar */}
            <ProductSidebarFilter
              products={karoHaliProducts}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />

            {/* Main Product Content Area */}
            <div className="product-page-main">
              <ProductFilterBar
                searchQuery={filters.searchQuery}
                onSearchChange={handleSearchChange}
                sortOption={filters.sortOption}
                onSortChange={handleSortChange}
                totalCount={filteredProducts.length}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              <ActiveFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />

              {filteredProducts.length > 0 ? (
                <>
                  <div className={viewMode === "list" ? "products-list-view" : "grid-4"}>
                    {currentProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        basePath="/karo-hali"
                        viewMode={viewMode}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={safeCurrentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              ) : (
                <div className="no-products-found">
                  <p>{t("products.noProductsFound")}</p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleResetFilters}
                  >
                    {t("products.clearSearch")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote CTA Banner */}
      <QuoteCtaBanner
        title={t("products.karoQuoteBannerTitle")}
        subtitle={t("products.karoQuoteBannerSubtitle")}
      />
    </div>
  );
};

export default KaroHali;
