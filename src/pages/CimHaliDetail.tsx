import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { cimHaliProducts } from '../data/cimHaliProducts';
import './ProductDetail.css';

import ProductImageZoom from '../components/ui/ProductImageZoom';
import AreaCalculator from '../components/ui/AreaCalculator';
import ShareButtons from '../components/ui/ShareButtons';
import SEO from '../components/seo/SEO';
import { formatPriceString, getProductDiscountInfo } from '../utils/productUtils';

const CimHaliDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [activeTab, setActiveTab] = useState<'description' | 'features'>('description');

  const product = cimHaliProducts.find((p) => p.slug === slug);

  const name = product ? (isEn ? product.nameEn : product.name) : '';
  const description = product ? (isEn ? product.descriptionEn : product.description) : '';
  const shortDesc = product ? (isEn ? product.shortDescEn : product.shortDesc) : '';
  const features = product ? (isEn ? product.featuresEn : product.features) : [];

  if (!product) return <Navigate to="/cim-hali" replace />;

  const priceFeature = features.find((f) => f.label === 'Fiyat' || f.label === 'Price');
  const others = cimHaliProducts.filter((p) => p.slug !== slug).slice(0, 4);
  const discountInfo = getProductDiscountInfo(product);

  return (
    <div className="product-detail page-enter">
      <SEO 
        title={product ? `${name} Çim Halı` : 'Çim Halı'}
        description={shortDesc || description}
        canonicalUrl={`/cim-hali/${slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": name,
          "image": product?.image ? `https://zenflor.com${product.image}` : "https://zenflor.com/logo-nobg.png",
          "description": description,
          "offers": {
            "@type": "Offer",
            "url": `https://zenflor.com/cim-hali/${slug}`,
            "priceCurrency": "TRY",
            "price": discountInfo.hasDiscount ? discountInfo.sellingPrice : (priceFeature ? priceFeature.value : "0"),
            "availability": "https://schema.org/InStock"
          }
        }}
      />
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Ana Sayfa', url: '/' },
            { label: t('products.cimHali'), url: '/cim-hali' },
            { label: name },
          ]}
        />
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/cim-hali" className="pd-breadcrumb__back">
            <ArrowLeft size={16} /> {t('products.backToList')}
          </Link>
        </nav>

        {/* Main */}
        <div className="pd-main">
          {/* Left Column: Image & Tabbed Details */}
          <div className="pd-media-col">
            <ProductImageZoom
              src={product.image}
              alt={name}
              badge={
                discountInfo.hasDiscount
                  ? (isEn ? `${discountInfo.discountAmount} ₺ Discount` : `${discountInfo.discountAmount} ₺ İndirim`)
                  : (product.featured ? (isEn ? 'Featured' : 'Öne Çıkan') : undefined)
              }
            />

            {/* Tabbed Section: Açıklama & Özellikler */}
            <div className="pd-tabs-container">
              <div className="pd-tabs-header">
                <button
                  type="button"
                  className={`pd-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  {isEn ? 'Description' : 'Açıklama'}
                </button>
                <button
                  type="button"
                  className={`pd-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  {t('products.features')}
                </button>
              </div>

              <div className="pd-tabs-content">
                {activeTab === 'description' && (
                  <div className="pd-tab-pane pd-desc-pane">
                    <p className="pd-desc-text">
                      {description}
                    </p>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="pd-tab-pane pd-features-pane">
                    <div className="pd-features-grid">
                      {features.map((f) => (
                        <div key={f.label} className="pd-feature">
                          <span className="pd-feature-label">{f.label}</span>
                          <span className="pd-feature-value">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="pd-info">
            <h1 className="pd-name font-display">{name}</h1>
            <p className="pd-desc">{description}</p>

            {priceFeature && (
              <div className="pd-price-box">
                <span className="pd-price-label">{isEn ? 'Unit Price:' : 'Birim Fiyatı:'}</span>
                {discountInfo.hasDiscount ? (
                  <div className="pd-price-discount-wrap">
                    <span className="pd-price-old">{discountInfo.formattedOriginalPrice}</span>
                    <span className="pd-price-value pd-price-value--discounted">{discountInfo.formattedSellingPrice}</span>
                    <span className="pd-discount-badge">{isEn ? `${discountInfo.discountAmount} ₺ Discount` : `${discountInfo.discountAmount} ₺ İndirim`}</span>
                  </div>
                ) : (
                  <span className="pd-price-value">{formatPriceString(priceFeature.value)}</span>
                )}
              </div>
            )}


            {/* Metrekare & Fiyat Hesaplayıcı */}
            <AreaCalculator unitPriceText={priceFeature?.value} productName={name} />

            {/* CTA */}
            <div className="pd-actions">
              <Link to="/iletisim" className="btn btn-primary btn-lg" id="product-info-request">
                <Mail size={18} /> {isEn ? 'Sample Request' : 'Numune Talebi'}
              </Link>
              <Link to="/cim-hali" className="btn btn-outline btn-lg">
                {t('products.allProducts')}
              </Link>
            </div>

            {/* Share & Copy Link */}
            <ShareButtons title={name} type="product" />
          </div>
        </div>

        {/* Other Products */}
        <section className="pd-others">
          <h2 className="pd-others-title">{t('products.otherProducts')}</h2>
          <div className="grid-4">
            {others.map((p) => (
              <ProductCard key={p.id} product={p} basePath="/cim-hali" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CimHaliDetail;
