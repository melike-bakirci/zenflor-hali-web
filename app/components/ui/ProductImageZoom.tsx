import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Search, X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import "./ProductImageZoom.css";

interface ProductImageZoomProps {
  src: string;
  images?: string[];
  alt: string;
  badge?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ProductImageZoom: React.FC<ProductImageZoomProps> = ({
  src,
  images,
  alt,
  badge,
  onError,
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const lightboxImgRef = useRef<HTMLImageElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Normalize image list
  const imageList = images && images.length > 0 ? images : [src];
  const currentImage = imageList[currentIndex] || src;
  const hasMultipleImages = imageList.length > 1;

  const prevImage = useCallback(() => {
    setScale(1);
    setMousePos({ x: 50, y: 50 });
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  }, [imageList.length]);

  const nextImage = useCallback(() => {
    setScale(1);
    setMousePos({ x: 50, y: 50 });
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  }, [imageList.length]);

  // Handle keyboard events (ESC, Arrow keys)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setScale(1);
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    },
    [prevImage, nextImage]
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setScale(1);
      setMousePos({ x: 50, y: 50 });
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handleKeyDown]);

  // Mouse move pan when zoomed in
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!lightboxImgRef.current) return;
    const rect = lightboxImgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  // Double click to zoom in / out
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (scale > 1) {
      setScale(1);
      setMousePos({ x: 50, y: 50 });
    } else {
      if (lightboxImgRef.current) {
        const rect = lightboxImgRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setMousePos({ x, y });
      }
      setScale(2.4);
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.35 : -0.35;
    setScale((prev) => {
      const next = Math.max(1, Math.min(3.5, Number((prev + delta).toFixed(2))));
      if (next === 1) {
        setMousePos({ x: 50, y: 50 });
      } else if (lightboxImgRef.current) {
        const rect = lightboxImgRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setMousePos({ x, y });
      }
      return next;
    });
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const fileExtMatch = currentImage.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/);
      const ext = fileExtMatch ? fileExtMatch[1] : "jpg";
      const cleanAlt = alt
        ? alt
            .toLowerCase()
            .replace(/[^a-z0-9çğıöşü]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
        : "urun-gorseli";

      link.download = `${cleanAlt}-${currentIndex + 1}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const link = document.createElement("a");
      link.href = currentImage;
      link.download = `${alt || "urun-gorseli"}-${currentIndex + 1}.jpg`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Touch swipe support for main slider
  const handleSliderTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleSliderTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <div className="pd-gallery-container">
      {/* Main Image Container on Product Page */}
      <div
        className="pd-image-wrap pd-zoom-trigger"
        onClick={() => setIsModalOpen(true)}
        onTouchStart={handleSliderTouchStart}
        onTouchEnd={handleSliderTouchEnd}
      >
        <img
          src={currentImage}
          alt={`${alt} - ${currentIndex + 1}`}
          className="pd-image"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={onError}
        />
        {badge && <span className="pd-badge badge-dark">{badge}</span>}

        {/* Navigation Arrows (Prev / Next) */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              className="pd-nav-arrow pd-nav-arrow--prev"
              aria-label="Önceki Görsel"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="pd-nav-arrow pd-nav-arrow--next"
              aria-label="Sonraki Görsel"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Overlay Action Buttons (Magnifier & Download) */}
        <div className="pd-image-actions">
          <button
            type="button"
            className="pd-action-btn pd-magnifier-btn"
            aria-label={t("zoom.magnify")}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            title={t("zoom.magnifyHint")}
          >
            <Search size={16} />
          </button>
          <button
            type="button"
            className="pd-action-btn pd-download-btn"
            aria-label={t("zoom.download")}
            onClick={handleDownload}
            title={t("zoom.download")}
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Pagination Dots (Circles indicating image count - outside image) */}
      {hasMultipleImages && (
        <div className="pd-slider-dots">
          {imageList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`pd-slider-dot ${idx === currentIndex ? "pd-slider-dot--active" : ""}`}
              aria-label={`Görsel ${idx + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
            />
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal Matching Reference UI */}
      {isModalOpen && (
        <div
          className="pd-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Top Bar Floating Controls */}
          <div
            className="pd-lightbox-topbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pd-lightbox-header-left">
              <span className="pd-lightbox-title">{alt.toUpperCase()}</span>
              {hasMultipleImages && (
                <span className="pd-lightbox-counter">
                  {currentIndex + 1} / {imageList.length}
                </span>
              )}
            </div>

            <div className="pd-lightbox-actions">
              <button
                type="button"
                className="pd-lightbox-action-btn"
                onClick={handleDownload}
                title={t("zoom.download")}
                aria-label={t("zoom.download")}
              >
                <Download size={20} />
              </button>
              <button
                type="button"
                className="pd-lightbox-action-btn pd-lightbox-action-btn--close"
                onClick={() => setIsModalOpen(false)}
                title={t("zoom.closeEsc")}
                aria-label={t("zoom.closeEsc")}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Navigation Arrows (Left / Right) */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                className="pd-lightbox-arrow pd-lightbox-arrow--prev"
                aria-label="Önceki Görsel"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                className="pd-lightbox-arrow pd-lightbox-arrow--next"
                aria-label="Sonraki Görsel"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          {/* Center Image Container with Double Click & Mouse Zoom */}
          <div
            className={`pd-lightbox-center ${scale > 1 ? "is-zoomed" : ""}`}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleDoubleClick}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
          >
            <div className="pd-lightbox-img-wrapper">
              <img
                ref={lightboxImgRef}
                src={currentImage}
                alt={`${alt} - ${currentIndex + 1}`}
                className="pd-lightbox-img"
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transform: `scale(${scale})`,
                }}
              />
            </div>
          </div>

          {/* Bottom Thumbnail Strip Container */}
          {hasMultipleImages && (
            <div
              className="pd-lightbox-thumbs-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pd-lightbox-thumbs-track">
                {imageList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pd-lightbox-thumb ${idx === currentIndex ? "pd-lightbox-thumb--active" : ""}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Görsel ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${alt} thumbnail ${idx + 1}`}
                      className="pd-lightbox-thumb-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductImageZoom;
