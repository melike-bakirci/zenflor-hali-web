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
  const tags = isEn ? product.tagsEn : product.tags;

  return (
    <article className="product-card card" id={`product-${product.id}`}>
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
          <Link
            to={`${basePath}/${product.slug}`}
            className="btn btn-primary product-card__cta"
            aria-label={`${name} detaylarını incele`}
          >
            {t('products.viewDetails')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="product-card__body">
        <div className="product-card__tags">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge badge-secondary product-card__tag">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__desc">{shortDesc}</p>
        <Link to={`${basePath}/${product.slug}`} className="product-card__link">
          {t('products.viewDetails')} <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
