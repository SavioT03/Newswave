import { tagColor, TimeAgo, SkeletonBlock, safeImg } from "../../api/useGNews";
import "./Cards.css";

export default function TextCard({ article, onClick }) {
  if (!article) {
    return (
      <div className="text-card">
        <SkeletonBlock style={{ width: 130, height: 90, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <SkeletonBlock style={{ height: 12, marginBottom: 8 }} />
          <SkeletonBlock style={{ height: 12, marginBottom: 8, width: "80%" }} />
          <SkeletonBlock style={{ height: 12, width: "55%" }} />
        </div>
      </div>
    );
  }

  const color = tagColor(article.source);

  return (
    <div className="text-card" style={{ cursor: "pointer" }} onClick={() => onClick?.(article)}>
      <div className="text-card-img-wrap">
        <img src={article.image} alt="" className="text-card-img" onError={safeImg} />
      </div>
      <div className="text-card-body">
        <span className="tag-badge" style={{ background: color }}>{article.source}</span>
        <p className="card-title" style={{ fontSize: "0.92rem" }}>{article.title}</p>
        {article.description && (
          <p className="card-excerpt" style={{
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {article.description}
          </p>
        )}
        <div style={{ marginTop: 4 }}><TimeAgo iso={article.publishedAt} /></div>
      </div>
    </div>
  );
}
