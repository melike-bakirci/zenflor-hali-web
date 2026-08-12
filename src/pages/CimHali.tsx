import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import Pagination from '../components/ui/Pagination';
import ProductFilterBar from '../components/ui/ProductFilterBar';
import ProductSidebarFilter from '../components/ui/ProductSidebarFilter';
import { cimHaliProducts } from '../data/cimHaliProducts';
import { filterAndSortProducts, type FilterState, type SortOption } from '../utils/productUtils';
import usePageMeta from '../utils/usePageMeta';
import './ProductList.css';

const ITEMS_PER_PAGE = 12;

const CimHali: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  usePageMeta({
    title: isEn ? 'Artificial Grass Models & Prices' : 'Çim Halı Modelleri ve Fiyatları',
    description: isEn
      ? 'Discover premium artificial synthetic grass products for gardens, balconies, terraces, and landscaping at optimal prices.'
      : 'Bahçe, balkon, teras ve peyzaj alanları için doğal görünümlü, dayanıklı sentetik çim halı modellerimizi inceleyin.',
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
    return filterAndSortProducts(cimHaliProducts, filters, isEn);
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
            <h1 className="page-hero__title font-display">{t('products.cimHali')}</h1>
            <p className="page-hero__subtitle">{t('products.cimHaliSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Ana Sayfa', url: '/' },
            { label: t('products.cimHali') },
          ]}
        />
      </div>

      {/* Products */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title={isEn ? 'All Artificial Grass Products' : 'Tüm Çim Halı Ürünlerimiz'}
            subtitle={isEn ? `${cimHaliProducts.length} different products` : `${cimHaliProducts.length} farklı ürün`}
          />

          <div className="product-page-layout">
            {/* Left Sidebar Filter Bar */}
            <ProductSidebarFilter
              products={cimHaliProducts}
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
                      <ProductCard key={product.id} product={product} basePath="/cim-hali" />
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

      {/* Info banner */}
      <div className="product-list__info">
        <div className="container product-list__info-inner">
          <div className="product-list__info-text">
            <h2>{isEn ? 'Need a Custom Solution?' : 'Özel Çözüm mü Arıyorsunuz?'}</h2>
            <p>
              {isEn
                ? 'Contact us for sports fields, landscaping and large-area projects.'
                : 'Spor alanı, peyzaj ve büyük alan projeleri için bizimle iletişime geçin.'}
            </p>
          </div>
          <a href="/iletisim" className="btn btn-primary">
            {t('products.infoRequest')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CimHali;
