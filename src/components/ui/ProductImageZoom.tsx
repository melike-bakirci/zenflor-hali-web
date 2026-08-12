import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, ZoomIn, ZoomOut } from 'lucide-react';
import './ProductImageZoom.css';

interface ProductImageZoomProps {
  src: string;
  alt: string;
  badge?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ProductImageZoom: React.FC<ProductImageZoomProps> = ({
  src,
  alt,
  badge,
  onError,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2.2);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Close modal on ESC key press
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
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

  const toggleZoomLevel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => (prev > 1.8 ? 1.5 : 2.5));
  };

  return (
    <>
      {/* Main Image Container on Product Page */}
      <div className="pd-image-wrap pd-zoom-trigger" onClick={() => setIsModalOpen(true)}>
        <img
          src={src}
          alt={alt}
          className="pd-image"
          onError={onError}
        />
        {badge && <span className="pd-badge badge-dark">{badge}</span>}

        {/* Minimalist Magnifier Button Overlay */}
        <button
          type="button"
          className="pd-magnifier-btn"
          aria-label="Görseli büyüt"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          title="Büyütmek için tıklayın"
        >
          <Search size={16} />
        </button>
      </div>

      {/* Minimalist Fullscreen Zoom Lightbox Modal */}
      {isModalOpen && (
        <div className="pd-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          {/* Top Bar Floating Controls */}
          <div className="pd-minimal-topbar" onClick={(e) => e.stopPropagation()}>
            <span className="pd-minimal-title">{alt}</span>
            <div className="pd-minimal-actions">
              <button
                type="button"
                className="pd-minimal-btn"
                onClick={toggleZoomLevel}
                title={zoomLevel > 1.8 ? 'Yakınlaştırmayı Azalt' : 'Yakınlaştırmayı Artır'}
              >
                {zoomLevel > 1.8 ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>
              <button
                type="button"
                className="pd-minimal-close"
                onClick={() => setIsModalOpen(false)}
                title="Kapat (ESC)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

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
              src={src}
              alt={alt}
              className="pd-minimal-image"
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: isHovering ? `scale(${zoomLevel})` : 'scale(1)',
              }}
            />
          </div>

          {/* Minimalist Bottom Hint */}
          <div className="pd-minimal-bottom-hint">
            <span>İmleci görsel üzerinde gezdirerek detayları inceleyebilirsiniz</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageZoom;
