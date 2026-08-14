import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Tag } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatPriceString, getProductDiscountInfo } from '../../utils/productUtils';
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

  const discountInfo = getProductDiscountInfo(product);

  return (
    <Link to={`${basePath}/${product.slug}`} className="product-card card" id={`product-${product.id}`}>
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={isEn ? name : `Uygun fiyatlı ve ucuz ${name} modelleri`}
          className="product-card__image"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            (e.currentTarget.nextSibling as HTMLElement)?.removeAttribute('style');
          }}
        />
        {discountInfo.hasDiscount && (
          <div className="product-card__discount-badge">
            <Tag size={12} />
            <span>{isEn ? `${discountInfo.discountAmount} ₺ Discount` : `${discountInfo.discountAmount} ₺ İndirim`}</span>
          </div>
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
        {shortDesc && <p className="product-card__desc">{shortDesc}</p>}
        <div className="product-card__footer">
          {discountInfo.hasDiscount ? (
            <div className="product-card__price-box">
              <span className="product-card__old-price">{discountInfo.formattedOriginalPrice}</span>
              <span className="product-card__price product-card__price--discounted">{discountInfo.formattedSellingPrice}</span>
            </div>
          ) : priceFeature ? (
            <span className="product-card__price">{formatPriceString(priceFeature.value)}</span>
          ) : null}
          <span className="product-card__link">
            {t('products.viewDetails')}<ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

