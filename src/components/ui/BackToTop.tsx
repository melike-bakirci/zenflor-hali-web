import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './BackToTop.css';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${isVisible ? 'back-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label={t('common.backToTop', 'En Yukarı Çık')}
      title={t('common.backToTop', 'En Yukarı Çık')}
    >
      <ChevronUp size={20} className="back-to-top__icon" />
    </button>
  );
};

export default BackToTop;
