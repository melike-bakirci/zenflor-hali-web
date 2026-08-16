import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageClick = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="pagination">
      <button
        className="pagination__btn pagination__btn--nav"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        aria-label={t("pagination.prevPage")}
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination__btn ${currentPage === page ? "pagination__btn--active" : ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination__btn pagination__btn--nav"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        aria-label={t("pagination.nextPage")}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
