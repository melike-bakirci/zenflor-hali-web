import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "~/components/ui/SectionTitle";
import ProductCard from "~/components/ui/ProductCard";
import Breadcrumb from "~/components/ui/Breadcrumb";
import Pagination from "~/components/ui/Pagination";
import ProductFilterBar from "~/components/ui/ProductFilterBar";
import ProductSidebarFilter from "~/components/ui/ProductSidebarFilter";
import { karoHaliProducts } from "~/data/karoHaliProducts";
import {
  filterAndSortProducts,
  type FilterState,
  type SortOption,
} from "~/utils/productUtils";
import QuoteCtaBanner from "~/components/ui/QuoteCtaBanner";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME } from "~/lib/constants";
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
  });
}

const KaroHali: React.FC = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    sortOption: "price-asc",
    selectedYarnTypes: [],
    selectedColors: [],
    selectedDimensions: [],
    selectedBacking: [],
    priceRange: [0, Infinity],
  });

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(karoHaliProducts, filters);
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sortOption: sort }));
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      sortOption: "price-asc",
      selectedYarnTypes: [],
      selectedColors: [],
      selectedDimensions: [],
      selectedBacking: [],
      priceRange: [0, Infinity],
    });
    setCurrentPage(1);
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
          <SectionTitle
            title={t("products.allProducts")}
            subtitle={t("products.productCount", { count: karoHaliProducts.length })}
          />

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
              />

              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid-4">
                    {currentProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        basePath="/karo-hali"
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => setCurrentPage(page)}
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
