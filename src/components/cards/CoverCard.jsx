import { tagColor, TimeAgo, SkeletonBlock, safeImg } from "../../api/useGNews";
import "./Cards.css";

export default function CoverCard({ article, height = 240, titleSize = "1rem", onClick }) {
  if (!article) {
    return <div style={{ height, borderRadius: 4, overflow: "hidden" }}><SkeletonBlock style={{ height: "100%" }} /></div>;
  }
  const color = tagColor(article.source);
  return (
    <div className="card-img-wrap overlay-card" style={{ height, cursor: "pointer" }} onClick={() => onClick?.(article)}>
      <img src={article.image} alt={article.title} className="card-img" style={{ height }} onError={safeImg} />
      <div className="overlay-gradient">
        <span className="tag-badge" style={{ background: color }}>{article.source}</span>
        <h3 className="overlay-card-title" style={{ fontSize: titleSize }}>{article.title}</h3>
        <div style={{ marginTop: 6 }}><TimeAgo iso={article.publishedAt} /></div>
      </div>
    </div>
  );
}
