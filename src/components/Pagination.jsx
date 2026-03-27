import "./Pagination.css";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {

  if (totalPages <= 1) return null;

  const pages = [];

  const visibleRange = 2;

  // Build the page list manually with ellipsis logic
  for (let i = 1; i <= totalPages; i++) {

    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - visibleRange && i <= currentPage + visibleRange)
    ) {
      pages.push(i);
    } 
    else {
      // If we're skipping pages, insert "…"
      if (pages[pages.length - 1] !== "…") {
        pages.push("…");
      }
    }
  }

  // Go to previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Go to next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="pagination-wrap" aria-label="News pagination">
      <div className="pagination">

        {/* Previous button */}
        <button
          className="pag-btn pag-btn--arrow"
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ‹
        </button>

        {/* Page numbers + ellipsis */}
        {pages.map((p, id) =>

          // If it's an ellipsis, just render text
          p === "…" ? (
            <span
              key={`ellipsis-${id}`}
              className="pag-ellipsis"
            >
              …
            </span>
          ) : (
            // Otherwise render a clickable page button
            <button
              key={p}
              className={`pag-btn${currentPage === p ? " pag-btn--active" : ""}`}
              onClick={() => onPageChange(p)}
              aria-current={currentPage === p ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}

        {/* Next button */}
        <button
          className="pag-btn pag-btn--arrow"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          ›
        </button>

      </div>
    </nav>
  );
}