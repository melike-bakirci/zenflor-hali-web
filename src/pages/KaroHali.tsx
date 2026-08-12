import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import Pagination from '../components/ui/Pagination';
import ProductFilterBar from '../components/ui/ProductFilterBar';
import { karoHaliProducts } from '../data/karoHaliProducts';
import { filterAndSortProducts, type SortOption } from '../utils/productUtils';
import './ProductList.css';

const ITEMS_PER_PAGE = 12;

const KaroHali: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(karoHaliProducts, searchQuery, sortOption, isEn);
  }, [searchQuery, sortOption, isEn]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
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
            { label: isEn ? 'Home' : 'Anasayfa', url: '/' },
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

          <ProductFilterBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortOption={sortOption}
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
                onClick={() => {
                  setSearchQuery('');
                  setSortOption('price-asc');
                  setCurrentPage(1);
                }}
              >
                {t('products.clearSearch')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Info banner */}
      <div className="product-list__info">
        <div className="container product-list__info-inner">
          <div className="product-list__info-text">
            <h2>{isEn ? 'Need a Custom Solution?' : 'Özel Çözüm mü Arıyorsunuz?'}</h2>
            <p>
              {isEn
                ? 'Contact us for custom dimensions, colors, and corporate projects.'
                : 'Özel boyut, renk ve kurumsal projeler için bizimle iletişime geçin.'}
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

export default KaroHali;
