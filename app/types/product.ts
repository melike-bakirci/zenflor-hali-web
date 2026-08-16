export interface ProductFeature {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "karo-hali" | "cim-hali";
  shortDesc: string;
  description: string;
  image: string;
  gallery?: string[];
  features: ProductFeature[];
  tags: string[];
  featured?: boolean;
}
