import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Phone, LayoutGrid, List } from "lucide-react";
import ProductCard from "~/components/ui/ProductCard";
import Breadcrumb from "~/components/ui/Breadcrumb";
import { cimHaliProducts } from "~/data/cimHaliProducts";
import "./product-detail.css";

import ProductImageZoom from "~/components/ui/ProductImageZoom";
import AreaCalculator from "~/components/ui/AreaCalculator";
import ShareButtons from "~/components/ui/ShareButtons";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME, SITE_URL } from "~/lib/constants";
import {
  formatPriceString,
  getProductDiscountInfo,
  getProductPrice,
} from "~/utils/productUtils";
import type { MetaArgs } from "react-router";

export function meta({ params }: MetaArgs) {
  const product = cimHaliProducts.find((p) => p.slug === params.slug);
  if (!product) {
    return seoMeta({ title: `Çim Halı | ${SITE_NAME}`, description: "" });
  }
  return seoMeta({
    title: `${product.name} Çim Halı | ${SITE_NAME}`,
    description: product.shortDesc || product.description,
    canonicalUrl: `/cim-hali/${product.slug}`,
    image: product.image,
    type: "product",
    breadcrumbs: [
      { label: "Ana Sayfa", url: "/" },
      { label: "Çim Halı", url: "/cim-hali" },
      { label: product.name, url: `/cim-hali/${product.slug}` },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.image
        ? `${SITE_URL}${product.image}`
        : `${SITE_URL}/logo-nobg.png`,
      description: product.description,
      sku: product.id,
      mpn: product.slug,
      category: "Çim Halı",
      brand: {
        "@type": "Brand",
        name: SITE_NAME,
      },
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}/cim-hali/${product.slug}`,
        priceCurrency: "TRY",
        price: getProductPrice(product),
        priceValidUntil: "2027-12-31",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    },
  });
}

const CimHaliDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [otherViewMode, setOtherViewMode] = useState<"grid" | "list">("grid");

  const product = cimHaliProducts.find((p) => p.slug === slug);

  if (!product) return <Navigate to="/cim-hali" replace />;

  const name = product.name;
  const description = product.description;
  const features = product.features || [];
  const priceFeature = features.find(
    (f) => f.label === "Fiyat" || f.label === "Price",
  );
  const others = cimHaliProducts.filter((p) => p.slug !== slug).slice(0, 4);
  const discountInfo = getProductDiscountInfo(product);

  return (
    <div className="product-detail page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: t("nav.home"), url: "/" },
            { label: t("products.cimHali"), url: "/cim-hali" },
            { label: name },
          ]}
        />

        {/* Main */}
        <div className="pd-main">
          {/* Left Column: Image & Features */}
          <div className="pd-media-col">
            <ProductImageZoom
              src={product.image}
              images={
                product.gallery && product.gallery.length > 0
                  ? [product.image, ...product.gallery]
                  : [
                      product.image,
                      "/images/cat-cim-landscape.png",
                      "/images/cat-cim-balcony.png",
                    ]
              }
              alt={name}
              badge={
                discountInfo.hasDiscount
                  ? t("products.discountBadge", { amount: discountInfo.discountAmount })
                  : undefined
              }
            />

            {/* Features Section */}
            {features.length > 0 && (
              <div className="pd-features">
                <h2 className="pd-features-title">{t("products.features")}</h2>
                <div className="pd-features-grid">
                  {features
                    .filter((f) => f.label !== "Fiyat" && f.label !== "Price")
                    .map((f) => (
                      <div key={f.label} className="pd-feature">
                        <span className="pd-feature-label">{f.label}</span>
                        <span className="pd-feature-value">{f.value}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <h1 className="pd-name font-display">{name}</h1>

            {priceFeature && (
              <div className="pd-price-box">
                {discountInfo.hasDiscount ? (
                  <div className="pd-price-discount-wrap">
                    <span className="pd-price-old">
                      {discountInfo.formattedOriginalPrice}
                    </span>
                    <span className="pd-price-value pd-price-value--discounted">
                      {discountInfo.formattedSellingPrice}
                    </span>
                    <span className="pd-discount-badge">
                      {t("products.discountBadge", { amount: discountInfo.discountAmount })}
                    </span>
                  </div>
                ) : (
                  <span className="pd-price-value">
                    {formatPriceString(priceFeature.value)}
                  </span>
                )}
              </div>
            )}

            <p className="pd-desc">{description}</p>

            {/* Metrekare & Fiyat Hesaplayıcı */}
            <AreaCalculator
              unitPriceText={priceFeature?.value}
              productName={name}
            />

            {/* CTA */}
            <div className="pd-actions">
              <a
                href="tel:+905302708487"
                className="btn btn-primary btn-lg"
                id="product-info-request"
              >
                <Phone size={18} /> {t("products.sampleRequest")}
              </a>
              <Link to="/cim-hali" className="btn btn-outline btn-lg">
                {t("products.allProducts")}
              </Link>
            </div>

            {/* Share & Copy Link */}
            <ShareButtons title={name} type="product" />
          </div>
        </div>

        {/* Other Products */}
        <section className="pd-others">
          <div className="pd-others-header">
            <h2 className="pd-others-title">{t("products.otherProducts")}</h2>
            <div className="view-mode-toggle" role="group" aria-label="Görünüm Modu">
              <button
                type="button"
                className={`view-mode-btn ${otherViewMode === "grid" ? "active" : ""}`}
                onClick={() => setOtherViewMode("grid")}
                title={t("products.gridView")}
                aria-label={t("products.gridView")}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                type="button"
                className={`view-mode-btn ${otherViewMode === "list" ? "active" : ""}`}
                onClick={() => setOtherViewMode("list")}
                title={t("products.listView")}
                aria-label={t("products.listView")}
              >
                <List size={18} />
              </button>
            </div>
          </div>
          <div className={otherViewMode === "list" ? "products-list-view" : "grid-4"}>
            {others.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                basePath="/cim-hali"
                viewMode={otherViewMode}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CimHaliDetail;
