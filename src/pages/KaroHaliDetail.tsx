import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { karoHaliProducts } from '../data/karoHaliProducts';
import type { Product } from '../types/product';
import './ProductDetail.css';

// Removed explicit PlaceholderBg to match cleaner architectural design

const KaroHaliDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const product = karoHaliProducts.find((p) => p.slug === slug);
  if (!product) return <Navigate to="/karo-hali" replace />;

  const name = isEn ? product.nameEn : product.name;
  const description = isEn ? product.descriptionEn : product.description;
  const features = isEn ? product.featuresEn : product.features;

  const priceFeature = features.find((f) => f.label === 'Fiyat' || f.label === 'Price');
  const others = karoHaliProducts.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="product-detail page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Anasayfa', url: '/' },
            { label: t('products.karoHali'), url: '/karo-hali' },
            { label: name },
          ]}
        />
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/karo-hali" className="pd-breadcrumb__back">
            <ArrowLeft size={16} /> {t('products.backToList')}
          </Link>
        </nav>

        {/* Main */}
        <div className="pd-main">
          {/* Image */}
          <div className="pd-image-wrap">
            <img
              src={product.image}
              alt={name}
              className="pd-image"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                (e.currentTarget.nextSibling as HTMLElement)?.removeAttribute('style');
              }}
            />
            {product.featured && (
              <span className="pd-badge badge-dark">
                {isEn ? 'Featured' : 'Öne Çıkan'}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <h1 className="pd-name font-display">{name}</h1>
            <p className="pd-desc">{description}</p>

            {priceFeature && (
              <div className="pd-price-box">
                <span className="pd-price-label">{isEn ? 'Unit Price:' : 'Birim Fiyatı:'}</span>
                <span className="pd-price-value">{priceFeature.value}</span>
              </div>
            )}

            {/* Features */}
            <div className="pd-features">
              <h2 className="pd-features-title">{t('products.features')}</h2>
              <div className="pd-features-grid">
                {features.map((f) => (
                  <div key={f.label} className="pd-feature">
                    <span className="pd-feature-label">{f.label}</span>
                    <span className="pd-feature-value">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pd-actions">
              <Link to="/iletisim" className="btn btn-primary btn-lg" id="product-info-request">
                <Mail size={18} /> {isEn ? 'Sample Request' : 'Numune Talebi'}
              </Link>
              <Link to="/karo-hali" className="btn btn-outline btn-lg">
                {t('products.allProducts')}
              </Link>
            </div>
          </div>
        </div>

        {/* Other Products */}
        <section className="pd-others">
          <h2 className="pd-others-title">{t('products.otherProducts')}</h2>
          <div className="grid-4">
            {others.map((p) => (
              <ProductCard key={p.id} product={p} basePath="/karo-hali" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KaroHaliDetail;
