import { tagColor, TimeAgo, SkeletonBlock, safeImg } from "../../api/useGNews";
import "./Cards.css";

export default function StoryCard({ article, height = 215, onClick }) {
  if (!article) return <SkeletonBlock style={{ height, borderRadius: 4 }} />;
  const color = tagColor(article.source);
  return (
    <div className="card-img-wrap highlight-card" style={{ height, cursor: "pointer" }} onClick={() => onClick?.(article)}>
      <img src={article.image} alt={article.title} className="card-img" style={{ height }} onError={safeImg} />
      <div className="overlay-gradient">
        <span className="tag-badge" style={{ background: color }}>{article.source}</span>
        <h3 className="overlay-card-title">{article.title}</h3>
        <div className="highlight-cta">
          <TimeAgo iso={article.publishedAt} />
          <span className="highlight-read">Read Story →</span>
        </div>
      </div>
    </div>
  );
}
