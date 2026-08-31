import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Search, X, ZoomIn, ZoomOut, Download, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [zoomLevel, setZoomLevel] = useState(2.2);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Normalize image list
  const imageList = images && images.length > 0 ? images : [src];
  const currentImage = imageList[currentIndex] || src;
  const hasMultipleImages = imageList.length > 1;

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  }, [imageList.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  }, [imageList.length]);

  // Handle keyboard events (ESC, Arrow keys)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handleKeyDown]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!imageRef.current || e.touches.length === 0) return;
    const rect = imageRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setMousePos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
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

  const toggleZoomLevel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => (prev > 1.8 ? 1.5 : 2.5));
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

      {/* Minimalist Fullscreen Zoom Lightbox Modal */}
      {isModalOpen && (
        <div
          className="pd-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Top Bar Floating Controls */}
          <div
            className="pd-minimal-topbar"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="pd-minimal-title">
              {alt} {hasMultipleImages ? `(${currentIndex + 1} / ${imageList.length})` : ""}
            </span>
            <div className="pd-minimal-actions">
              <button
                type="button"
                className="pd-minimal-btn"
                onClick={handleDownload}
                title={t("zoom.download")}
              >
                <Download size={18} />
              </button>
              <button
                type="button"
                className="pd-minimal-btn"
                onClick={toggleZoomLevel}
                title={
                  zoomLevel > 1.8
                    ? t("zoom.zoomOut")
                    : t("zoom.zoomIn")
                }
              >
                {zoomLevel > 1.8 ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>
              <button
                type="button"
                className="pd-minimal-close"
                onClick={() => setIsModalOpen(false)}
                title={t("zoom.closeEsc")}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                className="pd-modal-arrow pd-modal-arrow--prev"
                aria-label="Önceki Görsel"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                className="pd-modal-arrow pd-modal-arrow--next"
                aria-label="Sonraki Görsel"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Pure Viewport Container */}
          <div
            className="pd-minimal-viewport"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setMousePos({ x: 50, y: 50 });
            }}
          >
            <img
              ref={imageRef}
              src={currentImage}
              alt={`${alt} - ${currentIndex + 1}`}
              className="pd-minimal-image"
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: isHovering ? `scale(${zoomLevel})` : "scale(1)",
              }}
            />
          </div>

          {/* Modal Dots Navigation */}
          {hasMultipleImages && (
            <div
              className="pd-modal-dots"
              onClick={(e) => e.stopPropagation()}
            >
              {imageList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pd-modal-dot ${idx === currentIndex ? "pd-modal-dot--active" : ""}`}
                  aria-label={`Görsel ${idx + 1}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          )}

          {/* Minimalist Bottom Hint */}
          <div className="pd-minimal-bottom-hint">
            <span>{t("zoom.panHint")}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageZoom;
