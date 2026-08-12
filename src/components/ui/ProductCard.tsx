import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  basePath: string;
}

// SVG gradient placeholder when no real image
const PlaceholderImage: React.FC<{ category: Product['category'] }> = ({ category }) => (
  <div className={`product-card__placeholder product-card__placeholder--${category}`} aria-hidden="true">
    <div className="product-card__placeholder-pattern" />
    <div className="product-card__placeholder-icon">
      {category === 'karo-hali' ? '▦' : '🌿'}
    </div>
  </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, basePath }) => {
  const { i18n, t } = useTranslation();
  const isEn = i18n.language === 'en';

  const name = isEn ? product.nameEn : product.name;
  const shortDesc = isEn ? product.shortDescEn : product.shortDesc;
  const features = isEn ? product.featuresEn : product.features;
  const priceFeature = features?.find((f) => f.label === 'Fiyat' || f.label === 'Price');

  return (
    <Link to={`${basePath}/${product.slug}`} className="product-card card" id={`product-${product.id}`}>
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={name}
          className="product-card__image"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            (e.currentTarget.nextSibling as HTMLElement)?.removeAttribute('style');
          }}
        />
        <PlaceholderImage category={product.category} />
        {product.featured && (
          <span className="product-card__badge badge badge-primary">
            {isEn ? 'Featured' : 'Öne Çıkan'}
          </span>
        )}
        <div className="product-card__overlay">
          <span className="btn btn-primary product-card__cta">
            {t('products.viewDetails')} <ArrowRight size={16} />
          </span>
        </div>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__desc">{shortDesc}</p>
        <div className="product-card__footer">
          {priceFeature && (
            <span className="product-card__price">{priceFeature.value}</span>
          )}
          <span className="product-card__link">
            {t('products.viewDetails')} <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
