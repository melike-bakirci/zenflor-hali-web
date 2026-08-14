import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReferenceProject } from '../../data/referencesData';
import './ReferenceModal.css';

interface ReferenceModalProps {
  project: ReferenceProject | null;
  onClose: () => void;
  isEn?: boolean;
}

const ReferenceModal: React.FC<ReferenceModalProps> = ({ project, onClose, isEn = false }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const images = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.mainImage];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="ref-modal__backdrop ref-modal__backdrop--pure-image"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="ref-modal__container ref-modal__container--pure-image"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="ref-modal__close-btn"
          onClick={onClose}
          aria-label={isEn ? 'Close' : 'Kapat'}
        >
          <X size={24} />
        </button>

        <div className="ref-modal__image-wrapper">
          <img
            src={images[currentImgIndex]}
            alt={isEn ? (project.titleEn || 'Project Image') : `Kurumsal Zemin Kaplama Uygulama Referans Görseli: ${project.title}`}
            className="ref-modal__pure-img"
          />

          {images.length > 1 && (
            <>
              <button
                className="ref-modal__nav-btn ref-modal__nav-btn--prev"
                onClick={handlePrev}
                aria-label="Önceki Görsel"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className="ref-modal__nav-btn ref-modal__nav-btn--next"
                onClick={handleNext}
                aria-label="Sonraki Görsel"
              >
                <ChevronRight size={28} />
              </button>
              <div className="ref-modal__dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`ref-modal__dot ${index === currentImgIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImgIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferenceModal;
