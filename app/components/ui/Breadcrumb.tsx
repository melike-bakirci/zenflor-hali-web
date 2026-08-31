import React from "react";
import { Link } from "react-router";
import { Home, ChevronRight } from "lucide-react";
import { SITE_URL } from "~/lib/constants";
import "./Breadcrumb.css";

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
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

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb__list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li
                key={index}
                className={`breadcrumb__item ${isLast ? "breadcrumb__item--active" : ""}`}
              >
                {index > 0 && (
                  <ChevronRight
                    size={13}
                    className="breadcrumb__separator"
                    aria-hidden="true"
                  />
                )}
                {isLast || !item.url ? (
                  <span className="breadcrumb__current" aria-current="page">
                    {isFirst && (
                      <Home size={13} className="breadcrumb__home-icon" />
                    )}
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.url} className="breadcrumb__link">
                    {isFirst && (
                      <Home size={13} className="breadcrumb__home-icon" />
                    )}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;

