import { tagColor, SkeletonBlock,TimeAgo, safeImg } from "../api/useGNews";
import "./BigStory.css";

export default function BigStory({ article, onClick }) {
  if (!article) {
    return <SkeletonBlock style={{ height: "clamp(280px, 38vw, 400px)", borderRadius: 4 }} />;
  }
  const color = tagColor(article.source);
  return (
    <div className="big-story" style={{ cursor: "pointer" }} onClick={() => onClick?.(article)}>
      <img src={article.image} className="big-story-img" alt={article.title} onError={safeImg} />
      <div className="big-story-overlay" />
      <div className="big-story-content">
        <span className="tag-badge" style={{ background: color }}>{article.source}</span>
        <h2 className="big-story-title">{article.title}</h2>
        {article.description && <p className="big-story-excerpt">{article.description}</p>}
        <button className="btn-big-story-read">Read Full Story</button>
        <div style={{ marginTop: 3 }}><TimeAgo iso={article.publishedAt} />
        </div>
         </div>
      </div>
  );
}
