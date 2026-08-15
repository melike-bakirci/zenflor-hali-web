import React from "react";
import { Link } from "react-router";
import { Home, ChevronRight } from "lucide-react";
import "./Breadcrumb.css";

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
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
  );
};

export default Breadcrumb;
