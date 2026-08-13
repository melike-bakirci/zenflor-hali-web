import type { Product } from '../types/product';

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface FilterState {
  searchQuery: string;
  sortOption: SortOption;
  selectedYarnTypes: string[];  // e.g. ['%100 Polipropilen Fiber', '%100 PP'] for Karo Halı
  selectedColors: string[];     // e.g. ['Yeşil', 'Mavi', 'Yeşil (Sarı Otlu)'] for Çim Halı
  selectedDimensions: string[]; // e.g. ['50 cm x 50 cm', '25 cm x 100 cm', '7 mm', '20 mm']
  selectedBacking: string[];    // e.g. ['Saf Bitüm', 'Yumuşatılmış', 'Bitüm']
  priceRange: [number, number]; // [min, max]
}

/**
 * Fiyatı 5'in katlarına yukarı yuvarlar.
 * Fiyat zaten 5'in katıysa aynen kalır, değilse bir üst 5 katına yuvarlanır.
 * (Örn: 576 -> 580, 597.85 -> 600, 443 -> 445)
 */
export const roundUpTo5 = (price: number): number => {
  if (price <= 0 || isNaN(price)) return 0;
  return Math.ceil(price / 5) * 5;
};

export const formatPriceString = (priceStr?: string): string => {
  if (!priceStr) return '';

  const hasPerM2 = priceStr.toLowerCase().includes('/ m²') || priceStr.toLowerCase().includes('/m²');

  // Extract numeric part
  const cleanVal = priceStr.replace(/[^0-9.,]/g, '').trim();
  if (!cleanVal) return priceStr;

  let normalized = cleanVal;
  if (normalized.includes('.') && normalized.includes(',')) {
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  } else if (normalized.includes(',')) {
    normalized = normalized.replace(',', '.');
  }

  const num = parseFloat(normalized);
  if (isNaN(num)) return priceStr;

  const roundedNum = roundUpTo5(num);

  const formattedNum = roundedNum.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formattedNum} ₺${hasPerM2 ? ' / m²' : ''}`;
};

export const getProductPrice = (product: Product): number => {
  const priceFeature = product.features?.find(
    (f) => f.label.toLowerCase().includes('fiyat') || f.label.toLowerCase().includes('price')
  );
  if (!priceFeature) return 0;

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
  return isNaN(num) ? 0 : roundUpTo5(num);
};

export const getProductDimension = (product: Product): string => {
  const dimFeature = product.features?.find(
    (f) =>
      f.label.toLowerCase().includes('ebat') ||
      f.label.toLowerCase().includes('dimensions') ||
      f.label.toLowerCase().includes('hav boyutu') ||
      f.label.toLowerCase().includes('pile height')
  );
  return dimFeature ? dimFeature.value : '';
};

export const getProductBacking = (product: Product): string => {
  const backingFeature = product.features?.find(
    (f) =>
      f.label.toLowerCase().includes('ikincil taban') ||
      f.label.toLowerCase().includes('secondary backing')
  );
  return backingFeature ? backingFeature.value : '';
};

export const getProductYarnType = (product: Product, isEn: boolean = false): string => {
  const featuresList = isEn && product.featuresEn ? product.featuresEn : product.features;
  const yarnFeature = featuresList?.find(
    (f) =>
      f.label.toLowerCase().includes('iplik cinsi') ||
      f.label.toLowerCase().includes('yarn type')
  );
  if (yarnFeature) return yarnFeature.value;

  const fallbackList = isEn ? product.features : product.featuresEn;
  const fallbackFeature = fallbackList?.find(
    (f) =>
      f.label.toLowerCase().includes('iplik cinsi') ||
      f.label.toLowerCase().includes('yarn type')
  );
  return fallbackFeature ? fallbackFeature.value : '';
};

export const getProductColor = (product: Product): string => {
  const colorFeature = product.features?.find(
    (f) =>
      f.label.toLowerCase().includes('renk') ||
      f.label.toLowerCase().includes('color')
  );
  return colorFeature ? colorFeature.value : '';
};

/**
 * Arama metinlerini büyük/küçük harf ve Türkçe karakter hassasiyetinden arındırır.
 * MAVİ, MAVI, mavi, maVi, mavı gibi tüm varyasyonları "mavi" haline getirir.
 */
export const normalizeSearchText = (text: string = ''): string => {
  if (!text) return '';
  return text
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/Ç/g, 'c')
    .replace(/ç/g, 'c')
    .replace(/Ğ/g, 'g')
    .replace(/ğ/g, 'g')
    .replace(/Ö/g, 'o')
    .replace(/ö/g, 'o')
    .replace(/Ş/g, 's')
    .replace(/ş/g, 's')
    .replace(/Ü/g, 'u')
    .replace(/ü/g, 'u')
    .toLowerCase();
};

export const filterAndSortProducts = (
  products: Product[],
  filters: FilterState,
  isEn: boolean = false
): Product[] => {
  let result = [...products];

  // 1. Search Query
  if (filters.searchQuery.trim()) {
    const q = normalizeSearchText(filters.searchQuery.trim());
    result = result.filter((p) => {
      const name = normalizeSearchText(isEn ? p.nameEn || p.name : p.name);
      const desc = normalizeSearchText(isEn ? p.descriptionEn || p.description : p.description);
      const shortDesc = normalizeSearchText(isEn ? p.shortDescEn || p.shortDesc : p.shortDesc);
      const tags = normalizeSearchText((isEn ? p.tagsEn || p.tags : p.tags).join(' '));
      const features = normalizeSearchText(
        (isEn ? p.featuresEn || p.features : p.features)
          ?.map((f) => `${f.label} ${f.value}`)
          .join(' ') || ''
      );

      return (
        name.includes(q) ||
        desc.includes(q) ||
        shortDesc.includes(q) ||
        tags.includes(q) ||
        features.includes(q)
      );
    });
  }

  // 2. Yarn Type Filter (İplik Cinsi - for Karo Halı)
  if (filters.selectedYarnTypes && filters.selectedYarnTypes.length > 0) {
    result = result.filter((p) => {
      const yarnTr = normalizeSearchText(getProductYarnType(p, false));
      const yarnEn = normalizeSearchText(getProductYarnType(p, true));
      return filters.selectedYarnTypes.some((selectedYarn) => {
        const sNorm = normalizeSearchText(selectedYarn);
        return (
          yarnTr.includes(sNorm) ||
          yarnEn.includes(sNorm) ||
          sNorm.includes(yarnTr) ||
          sNorm.includes(yarnEn)
        );
      });
    });
  }

  // 3. Color Filter (Renk - for Çim Halı)
  if (filters.selectedColors && filters.selectedColors.length > 0) {
    result = result.filter((p) => {
      const color = normalizeSearchText(getProductColor(p));
      return filters.selectedColors.some((selectedColor) =>
        color.includes(normalizeSearchText(selectedColor))
      );
    });
  }

  // 4. Dimensions / Size Filter
  if (filters.selectedDimensions && filters.selectedDimensions.length > 0) {
    result = result.filter((p) => {
      const dim = normalizeSearchText(getProductDimension(p));
      return filters.selectedDimensions.some((selectedDim) =>
        dim.includes(normalizeSearchText(selectedDim))
      );
    });
  }

  // 5. Backing / Feature Filter (if relevant)
  if (filters.selectedBacking && filters.selectedBacking.length > 0) {
    result = result.filter((p) => {
      const backing = normalizeSearchText(getProductBacking(p));
      return filters.selectedBacking.some((selectedBacking) =>
        backing.includes(normalizeSearchText(selectedBacking))
      );
    });
  }

  // 6. Price Range Filter
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity) {
    result = result.filter((p) => {
      const price = getProductPrice(p);
      if (price === 0) return true; // Keep items without explicit price parseable
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
  }

  // 7. Sorting
  switch (filters.sortOption) {
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
