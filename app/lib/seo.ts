import type { MetaDescriptor } from "react-router";
import { SITE_NAME, SITE_URL } from "./constants";

export interface BreadcrumbItemMeta {
  label: string;
  url?: string;
}

export interface SeoOptions {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  type?: string;
  image?: string;
  schema?: Record<string, any> | Record<string, any>[] | string;
  breadcrumbs?: BreadcrumbItemMeta[];
  noindex?: boolean;
}

export function createBreadcrumbSchema(items: BreadcrumbItemMeta[]) {
  if (!items || items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const element: Record<string, any> = {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
      };
      if (item.url) {
        element.item = item.url.startsWith("http")
          ? item.url
          : `${SITE_URL}${item.url === "/" ? "" : item.url}`;
      }
      return element;
    }),
  };
}

export function seoMeta({
  title,
  description,
  keywords,
  canonicalUrl,
  type = "website",
  image,
  schema,
  breadcrumbs,
  noindex = false,
}: SeoOptions): MetaDescriptor[] {
  const url = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : SITE_URL;
  const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}/logo-nobg.png`;

  const descriptors: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
  ];

  if (keywords) descriptors.push({ name: "keywords", content: keywords });
  if (noindex)
    descriptors.push({ name: "robots", content: "noindex, nofollow" });

  descriptors.push({ tagName: "link", rel: "canonical", href: url });
  descriptors.push({ property: "og:type", content: type });
  descriptors.push({ property: "og:title", content: title });
  descriptors.push({ property: "og:description", content: description });
  descriptors.push({ property: "og:url", content: url });
  descriptors.push({ property: "og:site_name", content: SITE_NAME });
  descriptors.push({ property: "og:image", content: imageUrl });
  descriptors.push({ name: "twitter:card", content: "summary_large_image" });
  descriptors.push({ name: "twitter:title", content: title });
  descriptors.push({ name: "twitter:description", content: description });
  descriptors.push({ name: "twitter:image", content: imageUrl });

  const allSchemas: (Record<string, any> | string)[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = createBreadcrumbSchema(breadcrumbs);
    if (breadcrumbSchema) {
      allSchemas.push(breadcrumbSchema);
    }
  }

  if (schema) {
    if (Array.isArray(schema)) {
      allSchemas.push(...schema);
    } else {
      allSchemas.push(schema);
    }
  }

  for (const s of allSchemas) {
    descriptors.push({ "script:ld+json": s });
  }

  return descriptors;
}

