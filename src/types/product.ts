export interface ProductFeature {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  category: "karo-hali" | "cim-hali";
  shortDesc: string;
  shortDescEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  gallery?: string[];
  features: ProductFeature[];
  featuresEn: ProductFeature[];
  tags: string[];
  tagsEn: string[];
  featured?: boolean;
}
