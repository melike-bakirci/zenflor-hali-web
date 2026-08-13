import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, AlertTriangle, Info } from 'lucide-react';
import { roundUpTo5 } from '../../utils/productUtils';
import './AreaCalculator.css';

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface AreaCalculatorProps {
  unitPriceText?: string; // e.g. "₺ 550 / m²" or "550"
  productName?: string;   // e.g. "ILICA 22"
}

export const AreaCalculator: React.FC<AreaCalculatorProps> = ({ unitPriceText, productName }) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [area, setArea] = useState<string>('');

  // Extract numeric unit price from string (e.g., "550,00 ₺ / m²" -> 550)
  const extractPrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    const cleanStr = priceStr.replace(/[^0-9.,]/g, '').trim();
    if (!cleanStr) return 0;

    let normalized = cleanStr;
    if (normalized.includes('.') && normalized.includes(',')) {
      normalized = normalized.replace(/\./g, '').replace(',', '.');
    } else if (normalized.includes(',')) {
      normalized = normalized.replace(',', '.');
    }

    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : roundUpTo5(parsed);
  };

  const unitPrice = extractPrice(unitPriceText);
  const hasInput = area.trim() !== '' && !isNaN(parseFloat(area));
  const numericArea = hasInput ? parseFloat(area) : 0;

  const isMinError = hasInput && numericArea > 0 && numericArea < 5;
  const isStockWarning = hasInput && numericArea > 10000;

  const totalPrice = unitPrice * numericArea;

  const formattedTotalPrice = totalPrice.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Construct WhatsApp text message
  const pName = productName || (isEn ? 'product' : 'ürününüz');
  let waText = '';
  if (isStockWarning) {
    waText = isEn
      ? `Hello, I would like to get stock availability and quote info for ${pName} (${numericArea} m²).`
      : `Merhaba, ${pName} ürününden ${numericArea} m² yüksek metrajlı siparişim için stok durumu ve özel teklif almak istiyorum.`;
  } else {
    waText = isEn
      ? `Hello, I would like to get a quote for ${pName} (${numericArea} m²${unitPrice > 0 ? `, Estimated Total: ${formattedTotalPrice} ₺` : ''}).`
      : `Merhaba, ${pName} ürününden ${numericArea} m²${unitPrice > 0 ? ` (Tahmini Tutar: ${formattedTotalPrice} ₺)` : ''} teklif almak istiyorum.`;
  }

  const whatsappUrl = `https://wa.me/905302708487?text=${encodeURIComponent(waText)}`;

  return (
    <div className="area-calculator">
      <div className="ac-header">
        <Calculator size={18} className="ac-icon" />
        <span className="ac-title">
          {t('areaCalculator.title', isEn ? 'Area & Price Calculator' : 'Metrekare & Fiyat Hesaplama')}
        </span>
      </div>

      <div className="ac-body">
        <div className="ac-input-group">
          <label htmlFor="area-input" className="ac-label">
            {t('areaCalculator.label', isEn ? 'Required Area (m²):' : 'İhtiyacınız olan Metrekare (m²):')}
          </label>
          <div className="ac-input-container">
            <div className="ac-input-wrapper">
              <input
                id="area-input"
                type="number"
                min="5"
                max="10000"
                step="any"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="5"
                className={`ac-input ${isStockWarning ? 'ac-input--warning' : ''} ${isMinError ? 'ac-input--error' : ''}`}
              />
              <span className="ac-unit">m²</span>
            </div>
            <span className="ac-range-info">
              {t('areaCalculator.minMaxHint', isEn ? 'Min: 5 m² — Max: 10,000 m²' : 'Min: 5 m² — Max: 10.000 m²')}
            </span>
          </div>
        </div>

        {/* Minimalist Stock Warning (when > 10,000 m²) */}
        {isStockWarning && (
          <div className="ac-notice ac-notice--stock" role="alert">
            <AlertTriangle size={16} className="ac-notice-icon" />
            <span>
              {t(
                'areaCalculator.stockWarning',
                isEn
                  ? 'For orders of 10,000 m² or more, please contact us for custom stock availability and delivery schedule.'
                  : '10.000 m² ve üzeri siparişleriniz için lütfen özel stok ve teslimat süresi bilgisi alınız.'
              )}
            </span>
          </div>
        )}

        {/* Minimalist Min Quantity Warning (when < 5 m²) */}
        {isMinError && (
          <div className="ac-notice ac-notice--min" role="alert">
            <Info size={16} className="ac-notice-icon" />
            <span>
              {t(
                'areaCalculator.minWarning',
                isEn ? 'Minimum order quantity is 5 m².' : 'Minimum sipariş miktarı 5 m²\'dir.'
              )}
            </span>
          </div>
        )}

        {unitPrice > 0 && hasInput && numericArea >= 5 && numericArea <= 10000 && (
          <div className="ac-result">
            <span className="ac-result-label">
              {t('areaCalculator.estimatedTotal', isEn ? 'Estimated Total Price:' : 'Tahmini Toplam Fiyat:')}
            </span>
            <span className="ac-result-value">{formattedTotalPrice} ₺</span>
          </div>
        )}

        {hasInput && numericArea > 0 && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`ac-wa-btn ${isStockWarning ? 'ac-wa-btn--stock' : ''}`}
          >
            <WhatsAppIcon />
            <span>
              {isStockWarning
                ? t('areaCalculator.getStockQuoteWa', isEn ? 'Get Stock & Quote via WhatsApp' : 'WhatsApp ile Stok & Fiyat Bilgisi Al')
                : t('areaCalculator.getQuoteWa', isEn ? 'Get Quote via WhatsApp' : 'WhatsApp ile Teklif Al')}
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default AreaCalculator;


