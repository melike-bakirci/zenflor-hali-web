import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import Pagination from '../components/ui/Pagination';
import { cimHaliProducts } from '../data/cimHaliProducts';
import './ProductList.css';

const ITEMS_PER_PAGE = 12;

const CimHali: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cimHaliProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = cimHaliProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            { label: isEn ? 'Home' : 'Anasayfa', url: '/' },
            { label: t('products.cimHali') },
          ]}
        />
      </div>


      {/* Products */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title={isEn ? 'All Artificial Grass Products' : 'Tüm Çim Halı Ürünleri'}
            subtitle={isEn ? `${cimHaliProducts.length} different products` : `${cimHaliProducts.length} farklı ürün`}
          />
          <div className="grid-4">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} basePath="/cim-hali" />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>

      {/* Info banner */}
      <div className="product-list__info">
        <div className="container product-list__info-inner">
          <div className="product-list__info-text">
            <h2>{isEn ? 'Need a Custom Solution?' : 'Özel Çözüm mü Arıyorsunuz?'}</h2>
            <p>{isEn
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
