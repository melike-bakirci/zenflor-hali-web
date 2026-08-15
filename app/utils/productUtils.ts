import type { Product } from "~/types/product";
import { karoHaliProducts } from "~/data/karoHaliProducts";
import { cimHaliProducts } from "~/data/cimHaliProducts";

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

export interface FilterState {
  searchQuery: string;
  sortOption: SortOption;
  selectedYarnTypes: string[]; // e.g. ['%100 Polipropilen Fiber', '%100 PP'] for Karo Halı
  selectedColors: string[]; // e.g. ['Yeşil', 'Mavi', 'Yeşil (Sarı Otlu)'] for Çim Halı
  selectedDimensions: string[]; // e.g. ['50 cm x 50 cm', '25 cm x 100 cm', '7 mm', '20 mm']
  selectedBacking: string[]; // e.g. ['Saf Bitüm', 'Yumuşatılmış', 'Bitüm']
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
  if (!priceStr) return "";

  const hasPerM2 =
    priceStr.toLowerCase().includes("/ m²") ||
    priceStr.toLowerCase().includes("/m²");

  // Extract numeric part
  const cleanVal = priceStr.replace(/[^0-9.,]/g, "").trim();
  if (!cleanVal) return priceStr;

  let normalized = cleanVal;
  if (normalized.includes(".") && normalized.includes(",")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  } else if (normalized.includes(",")) {
    normalized = normalized.replace(",", ".");
  }

  const num = parseFloat(normalized);
  if (isNaN(num)) return priceStr;

  const roundedNum = roundUpTo5(num);

  const formattedNum = roundedNum.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formattedNum} ₺${hasPerM2 ? " / m²" : ""}`;
};

export const getProductPrice = (product: Product): number => {
  const priceFeature = product.features?.find(
    (f) =>
      f.label.toLowerCase().includes("fiyat") ||
      f.label.toLowerCase().includes("price"),
  );
  if (!priceFeature) return 0;

  const cleanVal = priceFeature.value.replace(/[^\d,. ]/g, "").trim();

  if (!cleanVal) return 0;

  let normalized = cleanVal;
  if (normalized.includes(".") && normalized.includes(",")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  } else if (normalized.includes(",")) {
    normalized = normalized.replace(",", ".");
  }

  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : roundUpTo5(num);
};

export const getMaxPriceForCategory = (
  category: "karo-hali" | "cim-hali",
): number => {
  const products =
    category === "karo-hali" ? karoHaliProducts : cimHaliProducts;
  let max = 0;
  for (const p of products) {
    const price = getProductPrice(p);
    if (price > max) {
      max = price;
    }
  }
  return max;
};

export const getMinPriceForCategory = (
  category: "karo-hali" | "cim-hali",
): number => {
  const products =
    category === "karo-hali" ? karoHaliProducts : cimHaliProducts;
  let min = Infinity;
  for (const p of products) {
    const price = getProductPrice(p);
    if (price > 0 && price < min) {
      min = price;
    }
  }
  return min === Infinity ? 0 : min;
};

export interface ProductDiscountInfo {
  hasDiscount: boolean;
  sellingPrice: number;
  originalPrice: number;
  formattedSellingPrice: string;
  formattedOriginalPrice: string;
  discountAmount: number;
}

export const getProductDiscountInfo = (
  product: Product,
): ProductDiscountInfo => {
  const sellingPrice = getProductPrice(product);
  const maxCategoryPrice = getMaxPriceForCategory(product.category);
  const minCategoryPrice = getMinPriceForCategory(product.category);

  let hasDiscount = false;
  let discountAmount = 0;

  if (sellingPrice > 0) {
    if (maxCategoryPrice > 0 && sellingPrice === maxCategoryPrice) {
      hasDiscount = true;
      discountAmount = 25;
    } else if (minCategoryPrice > 0 && sellingPrice === minCategoryPrice) {
      hasDiscount = true;
      discountAmount = 15;
    }
  }

  const originalPrice = hasDiscount
    ? sellingPrice + discountAmount
    : sellingPrice;

  const features = product.features || [];
  const priceFeature = features.find(
    (f) =>
      f.label.toLowerCase().includes("fiyat") ||
      f.label.toLowerCase().includes("price"),
  );
  const priceValueStr = priceFeature?.value || "";
  const hasPerM2 =
    priceValueStr.toLowerCase().includes("/ m²") ||
    priceValueStr.toLowerCase().includes("/m²");

  const formattedOriginalNum = originalPrice.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedOriginalPrice = `${formattedOriginalNum} ₺${hasPerM2 ? " / m²" : ""}`;
  const formattedSellingPrice = formatPriceString(priceValueStr);

  return {
    hasDiscount,
    sellingPrice,
    originalPrice,
    formattedSellingPrice,
    formattedOriginalPrice,
    discountAmount,
  };
};

export const getProductDimension = (product: Product): string => {
  const dimFeature = product.features?.find(
    (f) =>
      f.label.toLowerCase().includes("ebat") ||
      f.label.toLowerCase().includes("dimensions") ||
      f.label.toLowerCase().includes("hav boyutu") ||
      f.label.toLowerCase().includes("pile height"),
  );
  return dimFeature ? dimFeature.value : "";
};

export const getProductBacking = (product: Product): string => {
  const backingFeature = product.features?.find(
    (f) =>
      f.label.toLowerCase().includes("ikincil taban") ||
      f.label.toLowerCase().includes("secondary backing"),
  );
  return backingFeature ? backingFeature.value : "";
};

export const getProductYarnType = (
  product: Product,
  isEn: boolean = false,
): string => {
  const featuresList =
    isEn && product.featuresEn ? product.featuresEn : product.features;
  const yarnFeature = featuresList?.find(
    (f) =>
      f.label.toLowerCase().includes("iplik cinsi") ||
      f.label.toLowerCase().includes("yarn type"),
  );
  if (yarnFeature) return yarnFeature.value;

  const fallbackList = isEn ? product.features : product.featuresEn;
  const fallbackFeature = fallbackList?.find(
    (f) =>
      f.label.toLowerCase().includes("iplik cinsi") ||
      f.label.toLowerCase().includes("yarn type"),
  );
  return fallbackFeature ? fallbackFeature.value : "";
};

export const getProductColor = (product: Product): string => {
  const colorFeature = product.features?.find(
    (f) =>
      f.label.toLowerCase().includes("renk") ||
      f.label.toLowerCase().includes("color"),
  );
  return colorFeature ? colorFeature.value : "";
};

/**
 * Arama metinlerini büyük/küçük harf ve Türkçe karakter hassasiyetinden arındırır.
 * MAVİ, MAVI, mavi, maVi, mavı gibi tüm varyasyonları "mavi" haline getirir.
 */
export const normalizeSearchText = (text: string = ""): string => {
  if (!text) return "";
  return text
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/ı/g, "i")
    .replace(/Ç/g, "c")
    .replace(/ç/g, "c")
    .replace(/Ğ/g, "g")
    .replace(/ğ/g, "g")
    .replace(/Ö/g, "o")
    .replace(/ö/g, "o")
    .replace(/Ş/g, "s")
    .replace(/ş/g, "s")
    .replace(/Ü/g, "u")
    .replace(/ü/g, "u")
    .toLowerCase();
};

/**
 * Sayı ve birimler arasındaki boşlukları kaldırarak (örn: "50 cm" -> "50cm", "50 x 50" -> "50x50")
 * boyut ve birim aramalarının hassas eşleşmesini sağlar.
 */
export const normalizeCompactUnits = (text: string = ""): string => {
  if (!text) return "";
  const norm = normalizeSearchText(text);
  return norm
    .replace(/(\d+)\s*(cm|mm|m²|m2|m|g\/m²|g\/m2|g|kg|pcs|adet)\b/gi, "$1$2")
    .replace(/(\d+)\s*x\s*(\d+)/gi, "$1x$2");
};

/**
 * Ürün arama sorguları için zenginleştirilmiş metin havuzu oluşturur.
 * Ürün adı, kodu, özellikleri (TR & EN), iplik cinsleri (PP, PA, Poliamid, Polipropilen),
 * ebat varyasyonları (50cm, 50x50, 25x100, 7mm vb.) ve etiketleri içerir.
 */
export const getProductSearchableText = (
  p: Product,
): { fullText: string; compactText: string; tokens: Set<string> } => {
  const parts: string[] = [];
  const tokens = new Set<string>();

  // ID ve Slug
  if (p.id) parts.push(p.id);
  if (p.slug) {
    parts.push(p.slug);
    parts.push(p.slug.replace(/-/g, " "));
  }

  // İsimler
  if (p.name) parts.push(p.name);
  if (p.nameEn) parts.push(p.nameEn);

  // Açıklamalar
  if (p.shortDesc) parts.push(p.shortDesc);
  if (p.shortDescEn) parts.push(p.shortDescEn);
  if (p.description) parts.push(p.description);
  if (p.descriptionEn) parts.push(p.descriptionEn);

  // Etiketler
  if (p.tags) parts.push(...p.tags);
  if (p.tagsEn) parts.push(...p.tagsEn);

  // Özellikler (TR + EN hepsini dahil et)
  const allFeatures = [...(p.features || []), ...(p.featuresEn || [])];
  for (const f of allFeatures) {
    parts.push(`${f.label} ${f.value}`);

    const valLower = normalizeSearchText(f.value);

    // İplik cinsi eşleşmeleri (PP, PA, Poliamid, Polyamide, Polipropilen)
    if (
      valLower.includes("polipropilen") ||
      valLower.includes("polypropylene") ||
      valLower.includes("pp")
    ) {
      tokens.add("pp");
      tokens.add("polipropilen");
      tokens.add("polypropylene");
    }
    if (
      valLower.includes("polyamide") ||
      valLower.includes("poliamid") ||
      valLower.includes("naylon") ||
      valLower.includes("nylon") ||
      valLower.includes("pa")
    ) {
      tokens.add("pa");
      tokens.add("poliamid");
      tokens.add("polyamide");
      tokens.add("naylon");
      tokens.add("nylon");
    }

    // Taban cinsi (Bitüm, Keçe vb.)
    if (valLower.includes("bitüm") || valLower.includes("bitumen")) {
      tokens.add("bitum");
      tokens.add("bitumen");
    }

    // Ebat eşleşmeleri (50cm, 50x50, 25x100, 7mm vb.)
    if (valLower.includes("50 cm") || valLower.includes("50cm")) {
      tokens.add("50cm");
      tokens.add("50x50");
      tokens.add("50x50cm");
    }
    if (
      valLower.includes("25 cm") ||
      valLower.includes("25cm") ||
      valLower.includes("100 cm")
    ) {
      tokens.add("25cm");
      tokens.add("100cm");
      tokens.add("25x100");
      tokens.add("25x100cm");
    }
    if (valLower.includes("7 mm") || valLower.includes("7mm")) {
      tokens.add("7mm");
    }
    if (valLower.includes("20 mm") || valLower.includes("20mm")) {
      tokens.add("20mm");
    }
    if (valLower.includes("30 mm") || valLower.includes("30mm")) {
      tokens.add("30mm");
    }
    if (valLower.includes("40 mm") || valLower.includes("40mm")) {
      tokens.add("40mm");
    }
    if (valLower.includes("50 mm") || valLower.includes("50mm")) {
      tokens.add("50mm");
    }
  }

  const rawJoined = parts.join(" ");
  const fullText = normalizeSearchText(rawJoined);
  const compactText = normalizeCompactUnits(rawJoined);

  // Individual word tokens
  fullText.split(/\s+/).forEach((t) => {
    if (t.length > 0) tokens.add(t);
  });
  compactText.split(/\s+/).forEach((t) => {
    if (t.length > 0) tokens.add(t);
  });

  return { fullText, compactText, tokens };
};

export const filterAndSortProducts = (
  products: Product[],
  filters: FilterState,
  isEn: boolean = false,
): Product[] => {
  let result = [...products];

  // 1. Search Query
  if (filters.searchQuery.trim()) {
    const rawQuery = filters.searchQuery.trim();
    const normQuery = normalizeSearchText(rawQuery);

    const terms = normQuery.split(/\s+/).filter(Boolean);

    result = result.filter((p) => {
      const { fullText, compactText, tokens } = getProductSearchableText(p);

      return terms.every((term) => {
        const compactTerm = normalizeCompactUnits(term);

        // 1. Direct token set match (exact word / alias match like "pp", "pa", "50cm", "50x50", "7mm")
        if (tokens.has(term) || tokens.has(compactTerm)) {
          return true;
        }

        // 2. Short terms (<= 2 chars like "pa" or "pp"): require word boundary match or token match to avoid false positives
        if (term.length <= 2) {
          const regex = new RegExp(`\\b${term}\\b`, "i");
          return regex.test(fullText) || regex.test(compactText);
        }

        // 3. Normal substring match on fullText or compactText
        return (
          fullText.includes(term) ||
          compactText.includes(term) ||
          compactText.includes(compactTerm)
        );
      });
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
        color.includes(normalizeSearchText(selectedColor)),
      );
    });
  }

  // 4. Dimensions / Size Filter
  if (filters.selectedDimensions && filters.selectedDimensions.length > 0) {
    result = result.filter((p) => {
      const dim = normalizeSearchText(getProductDimension(p));
      return filters.selectedDimensions.some((selectedDim) =>
        dim.includes(normalizeSearchText(selectedDim)),
      );
    });
  }

  // 5. Backing / Feature Filter (if relevant)
  if (filters.selectedBacking && filters.selectedBacking.length > 0) {
    result = result.filter((p) => {
      const backing = normalizeSearchText(getProductBacking(p));
      return filters.selectedBacking.some((selectedBacking) =>
        backing.includes(normalizeSearchText(selectedBacking)),
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
    case "name-asc":
      result.sort((a, b) => {
        const nameA = isEn ? a.nameEn || a.name : a.name;
        const nameB = isEn ? b.nameEn || b.name : b.name;
        return nameA.localeCompare(nameB, isEn ? "en" : "tr", {
          sensitivity: "base",
          numeric: true,
        });
      });
      break;
    case "name-desc":
      result.sort((a, b) => {
        const nameA = isEn ? a.nameEn || a.name : a.name;
        const nameB = isEn ? b.nameEn || b.name : b.name;
        return nameB.localeCompare(nameA, isEn ? "en" : "tr", {
          sensitivity: "base",
          numeric: true,
        });
      });
      break;
    case "price-asc":
      result.sort((a, b) => getProductPrice(a) - getProductPrice(b));
      break;
    case "price-desc":
      result.sort((a, b) => getProductPrice(b) - getProductPrice(a));
      break;
    default:
      break;
  }

  return result;
};
