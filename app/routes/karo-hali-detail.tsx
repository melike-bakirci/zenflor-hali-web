import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Mail } from "lucide-react";
import ProductCard from "~/components/ui/ProductCard";
import Breadcrumb from "~/components/ui/Breadcrumb";
import { karoHaliProducts } from "~/data/karoHaliProducts";
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
  const product = karoHaliProducts.find((p) => p.slug === params.slug);
  if (!product) {
    return seoMeta({ title: `Karo Halı | ${SITE_NAME}`, description: "" });
  }
  return seoMeta({
    title: `${product.name} Karo Halı | ${SITE_NAME}`,
    description: product.shortDesc || product.description,
    canonicalUrl: `/karo-hali/${product.slug}`,
    image: product.image,
    type: "product",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.image
        ? `${SITE_URL}${product.image}`
        : `${SITE_URL}/logo-nobg.png`,
      description: product.description,
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}/karo-hali/${product.slug}`,
        priceCurrency: "TRY",
        price: getProductPrice(product),
        availability: "https://schema.org/InStock",
      },
    },
  });
}

const KaroHaliDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"description" | "features">(
    "description",
  );

  const product = karoHaliProducts.find((p) => p.slug === slug);

  const name = product ? product.name : "";
  const description = product ? product.description : "";
  const features = product ? product.features : [];

  if (!product) return <Navigate to="/karo-hali" replace />;

  const priceFeature = features.find(
    (f) => f.label === "Fiyat" || f.label === "Price",
  );
  const others = karoHaliProducts.filter((p) => p.slug !== slug).slice(0, 4);
  const discountInfo = getProductDiscountInfo(product);

  return (
    <div className="product-detail page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: t("nav.home"), url: "/" },
            { label: t("products.karoHali"), url: "/karo-hali" },
            { label: name },
          ]}
        />
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/karo-hali" className="pd-breadcrumb__back">
            <ArrowLeft size={16} /> {t("products.backToList")}
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
                  ? t("products.discountBadge", { amount: discountInfo.discountAmount })
                  : undefined
              }
            />

            {/* Tabbed Section: Açıklama & Özellikler */}
            <div className="pd-tabs-container">
              <div className="pd-tabs-header">
                <button
                  type="button"
                  className={`pd-tab-btn ${activeTab === "description" ? "active" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  {t("products.description")}
                </button>
                <button
                  type="button"
                  className={`pd-tab-btn ${activeTab === "features" ? "active" : ""}`}
                  onClick={() => setActiveTab("features")}
                >
                  {t("products.features")}
                </button>
              </div>

              <div className="pd-tabs-content">
                {activeTab === "description" && (
                  <div className="pd-tab-pane pd-desc-pane">
                    <p className="pd-desc-text">{description}</p>
                  </div>
                )}

                {activeTab === "features" && (
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
                <span className="pd-price-label">
                  {t("products.unitPrice")}
                </span>
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

            {/* Metrekare & Fiyat Hesaplayıcı */}
            <AreaCalculator
              unitPriceText={priceFeature?.value}
              productName={name}
            />

            {/* CTA */}
            <div className="pd-actions">
              <Link
                to="/iletisim"
                className="btn btn-primary btn-lg"
                id="product-info-request"
              >
                <Mail size={18} /> {t("products.sampleRequest")}
              </Link>
              <Link to="/karo-hali" className="btn btn-outline btn-lg">
                {t("products.allProducts")}
              </Link>
            </div>

            {/* Share & Copy Link */}
            <ShareButtons title={name} type="product" />
          </div>
        </div>

        {/* Other Products */}
        <section className="pd-others">
          <h2 className="pd-others-title">{t("products.otherProducts")}</h2>
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
