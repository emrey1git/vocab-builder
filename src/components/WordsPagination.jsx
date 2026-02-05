import React from "react";
import { 
  LuChevronLeft, 
  LuChevronRight, 
  LuChevronsLeft, 
  LuChevronsRight 
} from "react-icons/lu";
import "./css/pagination.css";

const WordsPagination = ({ total, current, onChange }) => {
  if (total <= 1) return null;

  const getPages = () => {
    const pages = [];
    const sidePages = 1; 

    if (total <= 7) {
  
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
   
      pages.push(1);

      if (current > sidePages + 2) {
        pages.push("...");
      }

    
      const start = Math.max(2, current - sidePages);
      const end = Math.min(total - 1, current + sidePages);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - (sidePages + 1)) {
        pages.push("...");
      }

    
      pages.push(total);
    }
    return pages;
  };

  return (
    <div className="pagination-wrapper">
      <button type="button" className="page-control" disabled={current === 1} onClick={() => onChange(1)}>
        <LuChevronsLeft />
      </button>
      <button type="button" className="page-control" disabled={current === 1} onClick={() => onChange(current - 1)}>
        <LuChevronLeft />
      </button>

      <div className="page-numbers-row">
        {getPages().map((page, index) => (
          page === "..." ? (
            <span key={`dots-${index}`} className="page-dots">...</span>
          ) : (
            <button
              key={page}
              type="button"
              className={`page-num ${current === page ? "active" : ""}`}
              onClick={() => onChange(page)}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button type="button" className="page-control" disabled={current === total} onClick={() => onChange(current + 1)}>
        <LuChevronRight />
      </button>
      <button type="button" className="page-control" disabled={current === total} onClick={() => onChange(total)}>
        <LuChevronsRight />
      </button>
    </div>
  );
};

export default WordsPagination;