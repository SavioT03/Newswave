import { tagColor, SkeletonBlock, safeImg } from "../api/useGNews";
import "./FeaturedLarge.css";

export default function FeaturedLarge({ article, onClick }) {
  if (!article) {
    return <SkeletonBlock style={{ height: "max(280px, min(38vw, 400px))", borderRadius: 4 }} />;
  }

  const color = tagColor(article.source);

  return (
    <div
      className="featured-large"
      style={{ cursor: "pointer" }}
      onClick={() => onClick?.(article)}
    >
      <img
        src={article.image}
        className="featured-large-img"
        alt={article.title}
        onError={safeImg}
      />
      <div className="featured-large-overlay" />
      <div className="featured-large-content">
        <span className="tag-badge" style={{ background: color }}>{article.source}</span>
        <h2 className="featured-large-title">{article.title}</h2>
        {article.description && (
          <p className="featured-large-desc">{article.description}</p>
        )}
        <button className="btn-featured-read">Read Full Story</button>
      </div>
    </div>
  );
}
