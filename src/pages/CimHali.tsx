import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import { cimHaliProducts } from '../data/cimHaliProducts';
import './ProductList.css';

const CimHali: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="product-list page-enter">
      {/* Page Hero */}
      <div className="page-hero page-hero--green">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">{t('products.cimHali')}</h1>
            <p className="page-hero__subtitle">{t('products.cimHaliSubtitle')}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title={isEn ? 'All Artificial Grass Products' : 'Tüm Çim Halı Ürünleri'}
            subtitle={isEn ? `${cimHaliProducts.length} different products` : `${cimHaliProducts.length} farklı ürün`}
          />
          <div className="grid-3">
            {cimHaliProducts.map((product) => (
              <ProductCard key={product.id} product={product} basePath="/cim-hali" />
            ))}
          </div>
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
