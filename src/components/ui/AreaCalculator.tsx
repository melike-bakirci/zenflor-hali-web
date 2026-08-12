import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator } from 'lucide-react';
import './AreaCalculator.css';

interface AreaCalculatorProps {
  unitPriceText?: string; // e.g. "₺ 550 / m²" or "550"
}

export const AreaCalculator: React.FC<AreaCalculatorProps> = ({ unitPriceText }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [area, setArea] = useState<string>('1');

  // Extract numeric unit price from string (e.g., "₺ 550 / m²" -> 550)
  const extractPrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    // Extract digits and decimal separator if present
    const cleanStr = priceStr.replace(/[^0-9.,]/g, '').replace(',', '.');
    const parsed = parseFloat(cleanStr);
    return isNaN(parsed) ? 0 : parsed;
  };

  const unitPrice = extractPrice(unitPriceText);
  const numericArea = Math.max(0, parseFloat(area) || 0);
  const totalPrice = unitPrice * numericArea;

  const formattedTotalPrice = totalPrice.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="area-calculator">
      <div className="ac-header">
        <Calculator size={18} className="ac-icon" />
        <span className="ac-title">
          {isEn ? 'Area & Price Calculator' : 'Metrekare & Fiyat Hesaplama'}
        </span>
      </div>

      <div className="ac-body">
        <div className="ac-input-group">
          <label htmlFor="area-input" className="ac-label">
            {isEn ? 'Required Area (m²):' : 'İhtiyacınız olan Metrekare (m²):'}
          </label>
          <div className="ac-input-wrapper">
            <input
              id="area-input"
              type="number"
              min="0"
              step="any"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="1"
              className="ac-input"
            />
            <span className="ac-unit">m²</span>
          </div>
        </div>

        {unitPrice > 0 && (
          <div className="ac-result">
            <span className="ac-result-label">{isEn ? 'Estimated Total:' : 'Tahmini Toplam Fiyat:'}</span>
            <span className="ac-result-value">₺ {formattedTotalPrice}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaCalculator;
