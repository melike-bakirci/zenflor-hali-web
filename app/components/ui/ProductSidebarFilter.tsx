import React, { useState, useEffect } from "react";
import type { Product } from "~/types/product";
import {
  type FilterState,
  getProductPrice,
  getProductDimension,
  getProductBacking,
  getProductYarnType,
  getProductColor,
} from "~/utils/productUtils";
import "./ProductSidebarFilter.css";

interface ProductSidebarFilterProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  isEn?: boolean;
}

const ProductSidebarFilter: React.FC<ProductSidebarFilterProps> = ({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  isEn = false,
}) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Extract available filter options dynamically from current category products
  const availableYarnTypes = Array.from(
    new Set(products.map((p) => getProductYarnType(p, isEn))),
  ).filter(Boolean);
  const availableColors = Array.from(
    new Set(products.map(getProductColor)),
  ).filter(Boolean);

  const availableDimensions = Array.from(
    new Set(products.map(getProductDimension).filter(Boolean)),
  );

  const availableBackings = Array.from(
    new Set(products.map(getProductBacking).filter(Boolean)),
  );

  // Calculate min and max price among products
  const prices = products.map(getProductPrice).filter((p) => p > 0);
  const minAvailablePrice = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const maxAvailablePrice = prices.length
    ? Math.ceil(Math.max(...prices))
    : 2000;

  const [tempPriceMin, setTempPriceMin] = useState<number>(
    filters.priceRange[0] === 0 ? minAvailablePrice : filters.priceRange[0],
  );
  const [tempPriceMax, setTempPriceMax] = useState<number>(
    filters.priceRange[1] === Infinity
      ? maxAvailablePrice
      : filters.priceRange[1],
  );

  useEffect(() => {
    setTempPriceMin(
      filters.priceRange[0] === 0 ? minAvailablePrice : filters.priceRange[0],
    );
    setTempPriceMax(
      filters.priceRange[1] === Infinity
        ? maxAvailablePrice
        : filters.priceRange[1],
    );
  }, [filters.priceRange, minAvailablePrice, maxAvailablePrice]);

  const handleYarnTypeToggle = (yarn: string) => {
    const current = filters.selectedYarnTypes || [];
    const updated = current.includes(yarn)
      ? current.filter((y) => y !== yarn)
      : [...current, yarn];
    onFilterChange({ ...filters, selectedYarnTypes: updated });
  };

  const handleColorToggle = (color: string) => {
    const current = filters.selectedColors || [];
    const updated = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color];
    onFilterChange({ ...filters, selectedColors: updated });
  };

  const handleDimensionToggle = (dim: string) => {
    const current = filters.selectedDimensions || [];
    const updated = current.includes(dim)
      ? current.filter((d) => d !== dim)
      : [...current, dim];
    onFilterChange({ ...filters, selectedDimensions: updated });
  };

  const handleBackingToggle = (backing: string) => {
    const current = filters.selectedBacking || [];
    const updated = current.includes(backing)
      ? current.filter((b) => b !== backing)
      : [...current, backing];
    onFilterChange({ ...filters, selectedBacking: updated });
  };

  const handlePriceApply = () => {
    onFilterChange({
      ...filters,
      priceRange: [tempPriceMin, tempPriceMax],
    });
  };

  const hasActiveFilters =
    (filters.selectedYarnTypes && filters.selectedYarnTypes.length > 0) ||
    (filters.selectedColors && filters.selectedColors.length > 0) ||
    (filters.selectedDimensions && filters.selectedDimensions.length > 0) ||
    (filters.selectedBacking && filters.selectedBacking.length > 0) ||
    filters.priceRange[0] > minAvailablePrice ||
    filters.priceRange[1] < maxAvailablePrice ||
    filters.searchQuery !== "";

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        type="button"
        className="sidebar-filter-mobile-toggle"
        onClick={() => setIsOpenMobile(!isOpenMobile)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span>{isEn ? "Filter Products" : "Ürünleri Filtrele"}</span>
        {hasActiveFilters && <span className="filter-active-dot" />}
      </button>

      {/* Overlay for mobile */}
      {isOpenMobile && (
        <div
          className="sidebar-filter-overlay"
          onClick={() => setIsOpenMobile(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`product-sidebar-filter ${isOpenMobile ? "is-open" : ""}`}
      >
        <div className="product-sidebar-filter__header">
          <div className="product-sidebar-filter__title-wrap">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <h3 className="product-sidebar-filter__title">
              {isEn ? "Filters" : "Filtreler"}
            </h3>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              className="product-sidebar-filter__clear-btn"
              onClick={onResetFilters}
            >
              {isEn ? "Clear All" : "Tümünü Temizle"}
            </button>
          )}
          <button
            type="button"
            className="product-sidebar-filter__close-mobile"
            onClick={() => setIsOpenMobile(false)}
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        {/* 1. Yarn Type Filter (İplik Cinsi - for Karo Halı) */}
        {availableYarnTypes.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-group__title">
              {isEn ? "Yarn Type" : "İplik Cinsi"}
            </h4>
            <div className="filter-group__options">
              {availableYarnTypes.map((yarn) => {
                const count = products.filter(
                  (p) => getProductYarnType(p, isEn) === yarn,
                ).length;
                return (
                  <label key={yarn} className="filter-checkbox-label">
                    <input
                      type="checkbox"
                      checked={(filters.selectedYarnTypes || []).includes(yarn)}
                      onChange={() => handleYarnTypeToggle(yarn)}
                    />
                    <span className="checkbox-custom" />
                    <span className="checkbox-text">{yarn}</span>
                    <span className="filter-count-badge">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Color Filter (Renk - for Çim Halı) */}
        {availableColors.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-group__title">{isEn ? "Color" : "Renk"}</h4>
            <div className="filter-group__options">
              {availableColors.map((color) => (
                <label key={color} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.selectedColors || []).includes(color)}
                    onChange={() => handleColorToggle(color)}
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">{color}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 3. Dimensions / Size Filter */}
        {availableDimensions.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-group__title">
              {isEn ? "Size / Dimension" : "Boyut / Ebat"}
            </h4>
            <div className="filter-group__options">
              {availableDimensions.map((dim) => (
                <label key={dim} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.selectedDimensions || []).includes(dim)}
                    onChange={() => handleDimensionToggle(dim)}
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">{dim}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 4. Backing / Technical Features Filter (If present) */}
        {availableBackings.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-group__title">
              {isEn ? "Backing Type" : "Taban / Özellik"}
            </h4>
            <div className="filter-group__options">
              {availableBackings.map((backing) => (
                <label key={backing} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.selectedBacking || []).includes(backing)}
                    onChange={() => handleBackingToggle(backing)}
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">{backing}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 5. Price Range Filter */}
        <div className="filter-group">
          <h4 className="filter-group__title">
            {isEn ? "Price Range (₺ / m²)" : "Fiyat Aralığı (₺ / m²)"}
          </h4>
          <div className="price-inputs">
            <div className="price-input-field">
              <input
                type="number"
                min={minAvailablePrice}
                max={tempPriceMax}
                value={tempPriceMin}
                onChange={(e) => setTempPriceMin(Number(e.target.value))}
                placeholder="Min"
              />
              <span>₺</span>
            </div>
            <span className="price-dash">-</span>
            <div className="price-input-field">
              <input
                type="number"
                min={tempPriceMin}
                max={maxAvailablePrice}
                value={tempPriceMax}
                onChange={(e) => setTempPriceMax(Number(e.target.value))}
                placeholder="Max"
              />
              <span>₺</span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary price-apply-btn"
            onClick={handlePriceApply}
          >
            {isEn ? "Apply Price" : "Fiyatı Uygula"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProductSidebarFilter;
