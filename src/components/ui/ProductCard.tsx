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

// Removed explicit SVG placeholder since images will fill the area cleanly with background colors.

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
        {product.featured && (
          <span className="product-card__badge badge-dark">
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
        <div className="product-card__meta">
          <span className="product-card__category">{product.category === 'karo-hali' ? 'Karo Halı' : 'Çim Halı'}</span>
        </div>
        <h3 className="product-card__name">{name}</h3>
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
