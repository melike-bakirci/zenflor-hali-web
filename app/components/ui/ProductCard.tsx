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
  viewMode?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  basePath,
  viewMode = "grid",
}) => {
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

  // Karo halı specific specification extractor (reads directly from each product's own features in exact requested order)
  const getKaroSpecs = () => {
    if (!features || features.length === 0) return "";

    const normalize = (s: string) =>
      s
        .replace(/İ/g, "i")
        .replace(/I/g, "i")
        .replace(/ı/g, "i")
        .replace(/Ğ/g, "g")
        .replace(/ğ/g, "g")
        .replace(/Ü/g, "u")
        .replace(/ü/g, "u")
        .replace(/Ş/g, "s")
        .replace(/ş/g, "s")
        .replace(/Ö/g, "o")
        .replace(/ö/g, "o")
        .replace(/Ç/g, "c")
        .replace(/ç/g, "c")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    // 1. İplik Cinsi (Kısa form: %100 PP, %100 PA)
    let yarn = features.find((f) => normalize(f.label).includes("iplik"))?.value;
    if (yarn) {
      const normYarn = normalize(yarn);
      if (
        normYarn.includes("polyamit") ||
        normYarn.includes("poliamid") ||
        normYarn.includes("polyamide") ||
        normYarn.includes("naylon") ||
        normYarn.includes("pa")
      ) {
        yarn = "%100 PA";
      } else if (
        normYarn.includes("polipropilen") ||
        normYarn.includes("polypropylene") ||
        normYarn.includes("pp")
      ) {
        yarn = "%100 PP";
      }
    }

    // 2. Yapı
    const structure = features.find((f) => normalize(f.label).includes("yapi"))?.value;

    // 3. Ebat
    const dimensions = features.find((f) => normalize(f.label).includes("ebat"))?.value;

    // 4. Birincil Taban
    const primaryBacking =
      features.find((f) => normalize(f.label).includes("birincil"))?.value ||
      features.find((f) => normalize(f.label).includes("taban"))?.value;

    // 5. İlmek Aralığı
    const gauge = features.find(
      (f) => normalize(f.label).includes("ilmek") || normalize(f.label).includes("aralik")
    )?.value;

    const specs = [yarn, structure, dimensions, primaryBacking, gauge].filter(
      (val): val is string => Boolean(val && val.trim() !== "")
    );

    return specs.length > 0 ? specs.join(", ") : shortDesc || "";
  };

  const imageAlt =
    product.category === "karo-hali"
      ? `${name} Karo Halı - Akustik Zemin Kaplama`
      : `${name} Çim Halı - Peyzaj ve Dekoratif Zemin Kaplama`;

  return (
    <Link
      to={`${basePath}/${product.slug}`}
      className={`product-card card ${viewMode === "list" ? "product-card--list" : ""}`}
      id={`product-${product.id}`}
    >
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={imageAlt}
          className="product-card__image"
          loading="lazy"
          decoding="async"
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

        {product.category === "karo-hali" ? (
          <p className="product-card__desc">{getKaroSpecs()}</p>
        ) : (
          shortDesc && <p className="product-card__desc">{shortDesc}</p>
        )}
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
