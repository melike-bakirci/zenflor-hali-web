import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ReferenceProject } from "~/data/referencesData";
import "./ProductImageZoom.css";
import "./ReferenceModal.css";

interface ReferenceModalProps {
  project: ReferenceProject | null;
  onClose: () => void;
}

const ReferenceModal: React.FC<ReferenceModalProps> = ({
  project,
  onClose,
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const lightboxImgRef = useRef<HTMLImageElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const title = project ? project.title : "";
  const images =
    project?.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages
      : project
        ? [project.mainImage]
        : [];
  const currentImage = images[currentIndex] || "";
  const hasMultipleImages = images.length > 1;

  const prevImage = useCallback(() => {
    setScale(1);
    setMousePos({ x: 50, y: 50 });
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const nextImage = useCallback(() => {
    setScale(1);
    setMousePos({ x: 50, y: 50 });
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Handle keyboard events (ESC, Arrow keys)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setScale(1);
        onClose();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    },
    [prevImage, nextImage, onClose]
  );

  useEffect(() => {
    if (project) {
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
  }, [project, handleKeyDown]);

  useEffect(() => {
    setCurrentIndex(0);
    setScale(1);
    setMousePos({ x: 50, y: 50 });
  }, [project]);

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

  // Non-passive wheel event to reliably prevent page scroll while zooming
  useEffect(() => {
    if (!project) return;
    const el = centerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
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

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="pd-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Top Bar Floating Controls */}
      <div
        className="pd-lightbox-topbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pd-lightbox-header-left">
          <span className="pd-lightbox-title">{title.toUpperCase()}</span>
          {hasMultipleImages && (
            <span className="pd-lightbox-counter">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>

        <div className="pd-lightbox-actions">
          <button
            type="button"
            className="pd-lightbox-action-btn pd-lightbox-action-btn--close"
            onClick={onClose}
            title={t("references.close")}
            aria-label={t("references.close")}
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
            aria-label={t("references.prevImage")}
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
            aria-label={t("references.nextImage")}
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
        ref={centerRef}
        className={`pd-lightbox-center ${scale > 1 ? "is-zoomed" : ""}`}
        onClick={(e) => {
          if (e.target !== lightboxImgRef.current) {
            onClose();
          }
        }}
        onDoubleClick={handleDoubleClick}
        onMouseMove={handleMouseMove}
      >
        <div
          className="pd-lightbox-img-wrapper"
          onClick={(e) => {
            if (e.target !== lightboxImgRef.current) {
              onClose();
            }
          }}
        >
          <img
            ref={lightboxImgRef}
            src={currentImage}
            alt={`${title} - ${currentIndex + 1}`}
            className="pd-lightbox-img"
            onClick={(e) => e.stopPropagation()}
            style={{
              transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
              transform: `scale(${scale})`,
            }}
            decoding="async"
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
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                className={`pd-lightbox-thumb ${idx === currentIndex ? "pd-lightbox-thumb--active" : ""}`}
                onClick={() => {
                  setScale(1);
                  setMousePos({ x: 50, y: 50 });
                  setCurrentIndex(idx);
                }}
                aria-label={`Görsel ${idx + 1}`}
              >
                <img
                  src={imgUrl}
                  alt={`${title} thumbnail ${idx + 1}`}
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
  );
};

export default ReferenceModal;
