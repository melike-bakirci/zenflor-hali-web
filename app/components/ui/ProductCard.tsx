import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Tag } from "lucide-react";
import type { Product } from "~/types/product";
import {
  formatPriceParts,
  getProductDiscountInfo,
} from "~/utils/productUtils";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  basePath: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, basePath }) => {
  const { t } = useTranslation();
  const name = product.name;
  const shortDesc = product.shortDesc;
  const features = product.features;
  const priceFeature = features?.find(
    (f) => f.label === "Fiyat" || f.label === "Price",
  );

  const discountInfo = getProductDiscountInfo(product);
  const normalPriceParts = priceFeature
    ? formatPriceParts(priceFeature.value)
    : null;

  return (
    <Link
      to={`${basePath}/${product.slug}`}
      className="product-card card"
      id={`product-${product.id}`}
    >
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={`Uygun fiyatlı ve ucuz ${name} modelleri`}
          className="product-card__image"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            (e.currentTarget.nextSibling as HTMLElement)?.removeAttribute(
              "style",
            );
          }}
        />
        {discountInfo.hasDiscount && (
          <div className="product-card__discount-badge">
            <Tag size={12} />
            <span>
              {t("products.discountBadge", { amount: discountInfo.discountAmount })}
            </span>
          </div>
        )}
        <div className="product-card__overlay">
          <span className="btn btn-primary product-card__cta">
            {t("products.viewDetails")} <ArrowRight size={16} />
          </span>
        </div>
      </div>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__category">
            {product.category === "karo-hali" ? t("nav.karoHali") : t("nav.cimHali")}
          </span>
        </div>
        <h3 className="product-card__name">{name}</h3>
        {shortDesc && <p className="product-card__desc">{shortDesc}</p>}
        <div className="product-card__footer">
          {discountInfo.hasDiscount ? (
            <div className="product-card__price-box">
              <span className="product-card__old-price">
                <span>{discountInfo.originalPriceParts.amount}</span>
                {discountInfo.originalPriceParts.unit && (
                  <span className="product-card__price-unit">
                    {discountInfo.originalPriceParts.unit}
                  </span>
                )}
              </span>
              <span className="product-card__price product-card__price--discounted">
                <span className="product-card__price-amount">
                  {discountInfo.sellingPriceParts.amount}
                </span>
                {discountInfo.sellingPriceParts.unit && (
                  <span className="product-card__price-unit">
                    {discountInfo.sellingPriceParts.unit}
                  </span>
                )}
              </span>
            </div>
          ) : normalPriceParts ? (
            <span className="product-card__price">
              <span className="product-card__price-amount">
                {normalPriceParts.amount}
              </span>
              {normalPriceParts.unit && (
                <span className="product-card__price-unit">
                  {normalPriceParts.unit}
                </span>
              )}
            </span>
          ) : null}
          <span
            className="product-card__circle-btn"
            aria-label={t("products.viewDetails")}
          >
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
