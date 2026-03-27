import "./Cards.css";

export default function TrendCard({ article, onClick }) {
  const text = article
    ? (article.title.length > 130 ? article.title.slice(0, 130) + "…" : article.title)
    : "Loading…";
  return (
    <div
      className="tweet-card"
      style={{ cursor: article ? "pointer" : "default", opacity: article ? 1 : 0.5 }}
      onClick={() => article && onClick?.(article)}
    >
      <div className="tweet-x-icon">𝕏</div>
      <p className="tweet-quote">"{text}"</p>
      {article && (
        <>
          <div className="tweet-divider" />
          <p className="tweet-cta">{article.source} · Trending →</p>
        </>
      )}
    </div>
  );
}
