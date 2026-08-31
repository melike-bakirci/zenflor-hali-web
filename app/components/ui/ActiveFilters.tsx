import React from "react";
import { useTranslation } from "react-i18next";
import type { FilterState } from "~/utils/productUtils";
import "./ActiveFilters.css";

interface ActiveFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const { t } = useTranslation();

  const hasYarnTypes = (filters.selectedYarnTypes || []).length > 0;
  const hasColors = (filters.selectedColors || []).length > 0;
  const hasDimensions = (filters.selectedDimensions || []).length > 0;
  const hasStructures = (filters.selectedStructures || []).length > 0;
  const hasSearch = Boolean(filters.searchQuery && filters.searchQuery.trim() !== "");
  const hasPrice =
    (filters.priceRange[0] > 0) ||
    (filters.priceRange[1] < Infinity);

  const hasAnyFilter =
    hasYarnTypes ||
    hasColors ||
    hasDimensions ||
    hasStructures ||
    hasSearch ||
    hasPrice;

  if (!hasAnyFilter) {
    return null;
  }

  const removeYarnType = (yarn: string) => {
    const updated = (filters.selectedYarnTypes || []).filter((y) => y !== yarn);
    onFilterChange({ ...filters, selectedYarnTypes: updated });
  };

  const removeColor = (color: string) => {
    const updated = (filters.selectedColors || []).filter((c) => c !== color);
    onFilterChange({ ...filters, selectedColors: updated });
  };

  const removeDimension = (dim: string) => {
    const updated = (filters.selectedDimensions || []).filter((d) => d !== dim);
    onFilterChange({ ...filters, selectedDimensions: updated });
  };

  const removeStructure = (structure: string) => {
    const updated = (filters.selectedStructures || []).filter((s) => s !== structure);
    onFilterChange({ ...filters, selectedStructures: updated });
  };

  const removeSearch = () => {
    onFilterChange({ ...filters, searchQuery: "" });
  };

  const removePrice = () => {
    onFilterChange({ ...filters, priceRange: [0, Infinity] });
  };

  const getPriceLabel = () => {
    const min = filters.priceRange[0];
    const max = filters.priceRange[1];
    if (min > 0 && max < Infinity) {
      return `${min} ₺ - ${max} ₺`;
    }
    if (min > 0) {
      return `Min ${min} ₺`;
    }
    if (max < Infinity) {
      return `Max ${max} ₺`;
    }
    return "";
  };

  return (
    <div className="active-filters-bar">
      <div className="active-filters-bar__left">
        <span className="active-filters-bar__title">
          {t("filters.activeFilters", "Aktif Filtreler:")}
        </span>
        <div className="active-filters-bar__tags">
          {/* Dimensions */}
          {(filters.selectedDimensions || []).map((dim) => (
            <button
              key={`dim-${dim}`}
              type="button"
              className="active-filter-tag"
              onClick={() => removeDimension(dim)}
              title={`${dim} filtresini kaldır`}
            >
              <span>{dim}</span>
              <span className="active-filter-tag__close">✕</span>
            </button>
          ))}

          {/* Yarn Types */}
          {(filters.selectedYarnTypes || []).map((yarn) => (
            <button
              key={`yarn-${yarn}`}
              type="button"
              className="active-filter-tag"
              onClick={() => removeYarnType(yarn)}
              title={`${yarn} filtresini kaldır`}
            >
              <span>{yarn}</span>
              <span className="active-filter-tag__close">✕</span>
            </button>
          ))}

          {/* Colors */}
          {(filters.selectedColors || []).map((color) => (
            <button
              key={`color-${color}`}
              type="button"
              className="active-filter-tag"
              onClick={() => removeColor(color)}
              title={`${color} filtresini kaldır`}
            >
              <span>{color}</span>
              <span className="active-filter-tag__close">✕</span>
            </button>
          ))}

          {/* Structures */}
          {(filters.selectedStructures || []).map((structure) => (
            <button
              key={`structure-${structure}`}
              type="button"
              className="active-filter-tag"
              onClick={() => removeStructure(structure)}
              title={`${structure} filtresini kaldır`}
            >
              <span>{structure}</span>
              <span className="active-filter-tag__close">✕</span>
            </button>
          ))}

          {/* Price Range */}
          {hasPrice && (
            <button
              type="button"
              className="active-filter-tag"
              onClick={removePrice}
              title="Fiyat filtresini kaldır"
            >
              <span>{getPriceLabel()}</span>
              <span className="active-filter-tag__close">✕</span>
            </button>
          )}

          {/* Search Query */}
          {hasSearch && (
            <button
              type="button"
              className="active-filter-tag"
              onClick={removeSearch}
              title="Arama filtresini kaldır"
            >
              <span>{`"${filters.searchQuery}"`}</span>
              <span className="active-filter-tag__close">✕</span>
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        className="active-filters-bar__clear-all"
        onClick={onResetFilters}
      >
        {t("filters.clearAll", "Tümünü Kaldır")}
      </button>
    </div>
  );
};

export default ActiveFilters;
