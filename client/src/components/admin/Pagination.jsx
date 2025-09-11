// client/src/components/common/Pagination.jsx
import React from "react";


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Helper to generate page numbers with ellipsis
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (i !== 1 && i !== totalPages) pages.push(i);
      }
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">
        Page <span className="font-semibold text-blue-600">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-50 transition disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
            Previous
        </button>
        {pages.map((page, idx) =>
          page === '...'
            ? <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
            : (
              <button
                key={`page-${page}-${idx}`} // unique key
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded-lg border border-gray-200 mx-0.5 font-semibold transition-all duration-150 ${
                  page === currentPage
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-blue-100'
                }`}
                style={{ minWidth: 36 }}
              >
                {page}
              </button>
            )
        )}
        <button
          className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-50 transition disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
