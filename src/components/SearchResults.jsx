import { tagColor, TimeAgo, safeImg } from "../api/useGNews";
import "./SearchResults.css";

function SearchResultItem({ article, onClick }) {
// Generate consistent color for source badge
  const color = tagColor(article.source);
  return (
    <div
      className="search-result-item"
      onClick={() => onClick?.(article)}
      style={{ cursor: "pointer" }}
    >
      <div className="search-result-img-wrap">
        <img
          src={article.image}
          alt={article.title}
          className="search-result-img"
          onError={safeImg} // fallback image if load fails
        />
      </div>
      <div className="search-result-body">
        <span className="tag-badge" style={{ background: color }}>
          {article.source}
        </span>
        <h3 className="search-result-title">{article.title}</h3>
        {article.description && (
          <p className="search-result-desc">{article.description}</p>
        )}
        <div className="search-result-meta">
          <TimeAgo iso={article.publishedAt} />
          <span className="search-result-cta">
            Read Story →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SearchResults({ query, articles, onArticleClick }) {

  // If query is empty (or just spaces), don't render anything
  if (!query.trim()) return null;

  // Filter articles based on query match (title, description, or source)
  const filtered = articles.filter((a) => {
    const q = query.toLowerCase(); //for case-insensitive search

    return (
      a.title?.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q) ||
      a.source?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="search-results-section">

      <div className="search-results-header">
        <h2 className="search-results-heading">
          Search results for{" "}
          <span className="search-results-query">"{query}"</span>
        </h2>

        {/* Dynamic result count with proper plural handling */}
        <span className="search-results-count">
          {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Empty state if no matches found */}
      {filtered.length === 0 ? (
        <div className="search-results-empty">
          <div className="search-results-empty-icon">🔍</div>
          <p>No articles matched your search. Try different keywords.</p>
        </div>
      ) : (
        // Render list of matched articles
        <div className="search-results-list">
          {filtered.map((article) => (
            <SearchResultItem
              key={article.id}
              article={article}
              onClick={onArticleClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}