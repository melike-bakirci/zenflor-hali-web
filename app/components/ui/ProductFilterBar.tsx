import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { SortOption } from "~/utils/productUtils";
import "./ProductFilterBar.css";

interface ProductFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  totalCount,
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onSearchChange("");
  };

  return (
    <div className="product-filter-bar">
      <form
        className="product-filter-bar__search-form"
        onSubmit={handleSearchSubmit}
      >
        <div className="product-filter-bar__input-wrapper">
          <svg
            className="product-filter-bar__search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="product-filter-bar__input"
            placeholder={t("products.searchPlaceholder")}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              // Live update as user types
              onSearchChange(e.target.value);
            }}
          />
          {inputValue && (
            <button
              type="button"
              className="product-filter-bar__clear-btn"
              onClick={handleClear}
              title={t("products.clearSearch")}
              aria-label={t("products.clearSearch")}
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          className="product-filter-bar__search-btn btn btn-primary"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>{t("products.searchButton")}</span>
        </button>
      </form>

      <div className="product-filter-bar__right">
        <div className="product-filter-bar__sort-wrapper">
          <label
            htmlFor="product-sort-select"
            className="product-filter-bar__sort-label"
          >
            {t("products.sortBy")}:
          </label>
          <div className="product-filter-bar__select-custom">
            <select
              id="product-sort-select"
              className="product-filter-bar__select"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
            >
              <option value="price-asc">{t("products.sortPriceAsc")}</option>
              <option value="price-desc">{t("products.sortPriceDesc")}</option>
              <option value="name-asc">{t("products.sortNameAsc")}</option>
              <option value="name-desc">{t("products.sortNameDesc")}</option>
            </select>
            <svg
              className="product-filter-bar__select-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="product-filter-bar__count">
          {t("products.showingProducts", { count: totalCount })}
        </div>
      </div>
    </div>
  );
};

export default ProductFilterBar;
