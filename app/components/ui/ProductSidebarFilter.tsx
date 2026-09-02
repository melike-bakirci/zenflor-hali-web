import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "~/types/product";
import {
  type FilterState,
  getProductPrice,
  getProductDimension,
  getProductStructure,
  getProductYarnType,
  getProductColor,
} from "~/utils/productUtils";
import "./ProductSidebarFilter.css";

interface ProductSidebarFilterProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const ProductSidebarFilter: React.FC<ProductSidebarFilterProps> = ({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  isOpenMobile: controlledIsOpenMobile,
  onCloseMobile,
}) => {
  const { t } = useTranslation();
  const [internalIsOpenMobile, setInternalIsOpenMobile] = useState(false);
  const isOpenMobile =
    controlledIsOpenMobile !== undefined
      ? controlledIsOpenMobile
      : internalIsOpenMobile;

  const handleClose = () => {
    if (onCloseMobile) {
      onCloseMobile();
    } else {
      setInternalIsOpenMobile(false);
    }
  };

  const handleToggle = () => {
    if (controlledIsOpenMobile !== undefined) {
      if (controlledIsOpenMobile && onCloseMobile) {
        onCloseMobile();
      }
    } else {
      setInternalIsOpenMobile((prev) => !prev);
    }
  };

  const isKaroHali = products.some((p) => p.category === "karo-hali");

  // Extract available filter options dynamically from current category products
  const availableYarnTypes = Array.from(
    new Set(products.map((p) => getProductYarnType(p))),
  ).filter(Boolean);
  const availableColors = Array.from(
    new Set(products.map(getProductColor)),
  ).filter(Boolean);

  const availableDimensions = Array.from(
    new Set(products.map(getProductDimension).filter(Boolean)),
  );

  const availableStructures = Array.from(
    new Set(products.map(getProductStructure).filter(Boolean)),
  );

  // Calculate min and max price among products
  const prices = products.map(getProductPrice).filter((p) => p > 0);
  const minAvailablePrice = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const maxAvailablePrice = prices.length
    ? Math.ceil(Math.max(...prices))
    : 2000;

  const [tempPriceMin, setTempPriceMin] = useState<number | "">(
    filters.priceRange[0] === 0 ? "" : filters.priceRange[0],
  );
  const [tempPriceMax, setTempPriceMax] = useState<number | "">(
    filters.priceRange[1] === Infinity ? "" : filters.priceRange[1],
  );

  useEffect(() => {
    setTempPriceMin(
      filters.priceRange[0] === 0 ? "" : filters.priceRange[0],
    );
    setTempPriceMax(
      filters.priceRange[1] === Infinity ? "" : filters.priceRange[1],
    );
  }, [filters.priceRange]);

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

  const handleStructureToggle = (structure: string) => {
    const current = filters.selectedStructures || [];
    const updated = current.includes(structure)
      ? current.filter((s) => s !== structure)
      : [...current, structure];
    onFilterChange({ ...filters, selectedStructures: updated });
  };

  const handlePriceApply = () => {
    const minVal = tempPriceMin === "" ? 0 : Number(tempPriceMin);
    const maxVal = tempPriceMax === "" ? Infinity : Number(tempPriceMax);
    onFilterChange({
      ...filters,
      priceRange: [minVal, maxVal],
    });
  };

  const hasActiveFilters =
    (filters.selectedYarnTypes && filters.selectedYarnTypes.length > 0) ||
    (filters.selectedColors && filters.selectedColors.length > 0) ||
    (filters.selectedDimensions && filters.selectedDimensions.length > 0) ||
    (filters.selectedStructures && filters.selectedStructures.length > 0) ||
    (filters.priceRange[0] > 0 && filters.priceRange[0] > minAvailablePrice) ||
    (filters.priceRange[1] < Infinity && filters.priceRange[1] < maxAvailablePrice) ||
    filters.searchQuery !== "";

  return (
    <>
      {/* Mobile Toggle Button (hidden by default when using filter bar button) */}
      <button
        type="button"
        className="sidebar-filter-mobile-toggle"
        onClick={handleToggle}
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
        <span>{t("filters.filterProducts")}</span>
        {hasActiveFilters && <span className="filter-active-dot" />}
      </button>

      {/* Overlay for mobile */}
      {isOpenMobile && (
        <div
          className="sidebar-filter-overlay"
          onClick={handleClose}
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
              {t("filters.filtersTitle")}
            </h3>
          </div>
          <button
            type="button"
            className="product-sidebar-filter__close-mobile"
            onClick={handleClose}
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        {/* 1. Yarn Type Filter (İplik Cinsi - for Karo Halı) */}
        {availableYarnTypes.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-group__title">
              {t("filters.yarnType")}
            </h4>
            <div className="filter-group__options">
              {availableYarnTypes.map((yarn) => (
                <label key={yarn} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.selectedYarnTypes || []).includes(yarn)}
                    onChange={() => handleYarnTypeToggle(yarn)}
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">{yarn}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 2. Color Filter (Renk - for Çim Halı) */}
        {availableColors.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-group__title">{t("filters.color")}</h4>
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
              {isKaroHali ? t("filters.size", "Boyut") : t("filters.dimension", "Kalınlık")}
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

        {/* 4. Structure / Yapı Filter (for Karo Halı) */}
        {availableStructures.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-group__title">
              {t("filters.structure")}
            </h4>
            <div className="filter-group__options">
              {availableStructures.map((structure) => (
                <label key={structure} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.selectedStructures || []).includes(structure)}
                    onChange={() => handleStructureToggle(structure)}
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">{structure}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 5. Price Range Filter */}
        <div className="filter-group">
          <h4 className="filter-group__title">
            {t("filters.priceRange")}
          </h4>
          <div className="price-inputs">
            <div className="price-input-col">
              <span className="price-input-label">{t("filters.minPrice", "Min (₺)")}</span>
              <div className="price-input-field">
                <input
                  type="number"
                  min={minAvailablePrice}
                  max={tempPriceMax !== "" ? Number(tempPriceMax) : maxAvailablePrice}
                  value={tempPriceMin}
                  onChange={(e) =>
                    setTempPriceMin(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePriceApply();
                  }}
                  placeholder={minAvailablePrice ? String(minAvailablePrice) : "0"}
                />
              </div>
            </div>
            <span className="price-dash">-</span>
            <div className="price-input-col">
              <span className="price-input-label">{t("filters.maxPrice", "Max (₺)")}</span>
              <div className="price-input-field">
                <input
                  type="number"
                  min={tempPriceMin !== "" ? Number(tempPriceMin) : minAvailablePrice}
                  max={maxAvailablePrice}
                  value={tempPriceMax}
                  onChange={(e) =>
                    setTempPriceMax(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePriceApply();
                  }}
                  placeholder={maxAvailablePrice ? String(maxAvailablePrice) : ""}
                />
              </div>
            </div>
          </div>
          <div className="price-actions">
            <button
              type="button"
              className="btn btn-primary price-apply-btn"
              onClick={handlePriceApply}
            >
              {t("filters.applyPrice")}
            </button>
            <button
              type="button"
              className="btn btn-secondary price-clear-btn"
              onClick={() => {
                setTempPriceMin("");
                setTempPriceMax("");
                onResetFilters();
              }}
            >
              {t("products.clearSearch")}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Bottom Action */}
        <div className="product-sidebar-filter__mobile-footer">
          <button
            type="button"
            className="btn btn-primary product-sidebar-filter__apply-btn"
            onClick={handleClose}
          >
            {t("filters.showFilters")}
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProductSidebarFilter;
