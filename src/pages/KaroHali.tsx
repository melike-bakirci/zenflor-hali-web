import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { karoHaliProducts } from '../data/karoHaliProducts';
import './ProductList.css';

const KaroHali: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

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
          <div className="grid-4">
            {karoHaliProducts.map((product) => (
              <ProductCard key={product.id} product={product} basePath="/karo-hali" />
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
