import type { Product } from '../types/product';

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export const getProductPrice = (product: Product): number => {
  const priceFeature = product.features?.find(
    (f) => f.label.toLowerCase().includes('fiyat') || f.label.toLowerCase().includes('price')
  );
  if (!priceFeature) return 0;

  // Extract digits and decimal punctuation from string like "₺ 1.096,15 / m²" or "₺ 550 / m²"
  const cleanVal = priceFeature.value
    .replace(/[^\d,. ]/g, '')
    .trim();

  if (!cleanVal) return 0;

  let normalized = cleanVal;
  if (normalized.includes('.') && normalized.includes(',')) {
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  } else if (normalized.includes(',')) {
    normalized = normalized.replace(',', '.');
  }

  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : num;
};

export const filterAndSortProducts = (
  products: Product[],
  searchQuery: string,
  sortOption: SortOption,
  isEn: boolean = false
): Product[] => {
  let result = [...products];

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    result = result.filter((p) => {
      const name = (isEn ? p.nameEn || p.name : p.name).toLowerCase();
      const desc = (isEn ? p.descriptionEn || p.description : p.description).toLowerCase();
      const tags = (isEn ? p.tagsEn || p.tags : p.tags).join(' ').toLowerCase();
      return name.includes(q) || desc.includes(q) || tags.includes(q);
    });
  }

  // Sorting
  switch (sortOption) {
    case 'name-asc':
      result.sort((a, b) => {
        const nameA = isEn ? a.nameEn || a.name : a.name;
        const nameB = isEn ? b.nameEn || b.name : b.name;
        return nameA.localeCompare(nameB, isEn ? 'en' : 'tr', { sensitivity: 'base', numeric: true });
      });
      break;
    case 'name-desc':
      result.sort((a, b) => {
        const nameA = isEn ? a.nameEn || a.name : a.name;
        const nameB = isEn ? b.nameEn || b.name : b.name;
        return nameB.localeCompare(nameA, isEn ? 'en' : 'tr', { sensitivity: 'base', numeric: true });
      });
      break;
    case 'price-asc':
      result.sort((a, b) => getProductPrice(a) - getProductPrice(b));
      break;
    case 'price-desc':
      result.sort((a, b) => getProductPrice(b) - getProductPrice(a));
      break;
    default:
      break;
  }

  return result;
};
