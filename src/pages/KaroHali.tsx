import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import Pagination from '../components/ui/Pagination';
import ProductFilterBar from '../components/ui/ProductFilterBar';
import ProductSidebarFilter from '../components/ui/ProductSidebarFilter';
import { karoHaliProducts } from '../data/karoHaliProducts';
import { filterAndSortProducts, type FilterState, type SortOption } from '../utils/productUtils';
import QuoteCtaBanner from '../components/ui/QuoteCtaBanner';
import usePageMeta from '../utils/usePageMeta';
import './ProductList.css';

const ITEMS_PER_PAGE = 12;

const KaroHali: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  usePageMeta({
    title: isEn ? 'Carpet Tile Models & Prices' : 'Karo Halı Modelleri ve Fiyatları',
    description: isEn
      ? 'Explore high quality carpet tile collections for offices, hotels, and corporate buildings at the best prices.'
      : 'Ofis, otel ve kurumsal mekanlar için en uygun fiyatlı, yüksek ses akustikli karo halı çeşitlerimizi keşfedin.',
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    sortOption: 'price-asc',
    selectedYarnTypes: [],
    selectedColors: [],
    selectedDimensions: [],
    selectedBacking: [],
    priceRange: [0, Infinity],
  });

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(karoHaliProducts, filters, isEn);
  }, [filters, isEn]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
      searchQuery: '',
      sortOption: 'price-asc',
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
            <h1 className="page-hero__title font-display">{t('products.karoHali')}</h1>
            <p className="page-hero__subtitle">{t('products.karoHaliSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Ana Sayfa', url: '/' },
            { label: t('products.karoHali') },
          ]}
        />
      </div>

      {/* Products */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title={t('products.allProducts')}
            subtitle={isEn ? `${karoHaliProducts.length} different products` : `${karoHaliProducts.length} farklı ürün`}
          />

          <div className="product-page-layout">
            {/* Left Sidebar Filter Bar */}
            <ProductSidebarFilter
              products={karoHaliProducts}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              isEn={isEn}
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
                      <ProductCard key={product.id} product={product} basePath="/karo-hali" />
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
                  <p>{t('products.noProductsFound')}</p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleResetFilters}
                  >
                    {t('products.clearSearch')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote CTA Banner */}
      <QuoteCtaBanner
        title={isEn ? 'Get a Quote for Your Carpet Tile Project!' : 'Karo Halı Projeniz İçin Teklif Alın!'}
        subtitle={
          isEn
            ? 'Request custom carpet tile quotes and free physical samples tailored to your office, hotel, or commercial space.'
            : 'Ofis, otel ve ticari alanlarınız için zemin ölçülerinize uygun özel karo halı fiyat teklifi ve ücretsiz numune isteyin.'
        }
      />
    </div>
  );
};

export default KaroHali;
