import { tagColor, TimeAgo, SkeletonBlock, safeImg } from "../../api/useGNews";
import "./Cards.css";

export default function PhotoCard({ article, imgHeight = 180, onClick }) {
  if (!article) {
    return (
      <div>
        <SkeletonBlock style={{ height: imgHeight, marginBottom: 10 }} />
        <SkeletonBlock style={{ height: 12, marginBottom: 8 }} />
        <SkeletonBlock style={{ height: 12, width: "70%" }} />
      </div>
    );
  }
  const color = tagColor(article.source);
  return (
    <div className="image-top-card" style={{ cursor: "pointer" }} onClick={() => onClick?.(article)}>
      <div className="card-img-wrap" style={{ height: imgHeight, marginBottom: 10 }}>
        <img src={article.image} alt={article.title} className="card-img" style={{ height: imgHeight }} onError={safeImg} />
      </div>
      <span className="tag-badge" style={{ background: color }}>{article.source}</span>
      <h3 className="card-title">{article.title}</h3>
      {article.description && (
        <p className="card-excerpt" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {article.description}
        </p>
      )}
      <div style={{ marginTop: 4 }}><TimeAgo iso={article.publishedAt} /></div>
    </div>
  );
}
