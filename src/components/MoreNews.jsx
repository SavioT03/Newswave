import { tagColor, SkeletonBlock, safeImg, TimeAgo } from "../api/useGNews";
import "./MoreNews.css";

export default function MoreNews({ article, onClick }) {
  if (!article) {
    return (
      <div className="more-news-box">
        <SkeletonBlock style={{ height:14, width:"40%", marginBottom:16, background:"rgba(255,255,255,0.1)" }} />
        <SkeletonBlock style={{ height:130, marginBottom:14, background:"rgba(255,255,255,0.06)" }} />
        <SkeletonBlock style={{ height:12, marginBottom:8, background:"rgba(255,255,255,0.06)" }} />
        <SkeletonBlock style={{ height:12, width:"70%", background:"rgba(255,255,255,0.06)" }} />
      </div>
    );
  }
  const color = tagColor(article.source);
  return (
    <div className="more-news-box" style={{ cursor:"pointer" }} onClick={() => onClick?.(article)}>
      <div className="more-news-label">Latest</div>
      <div className="more-news-img-wrap">
        <img src={article.image} alt={article.title} className="more-news-img" onError={safeImg} />
        <span className="tag-badge more-news-badge" style={{ background:color }}>{article.source}</span>
      </div>
      <h3 className="more-news-title">{article.title}</h3>
      {article.description && <p className="more-news-desc">{article.description}</p>}
      <div className="more-news-footer">
        <TimeAgo iso={article.publishedAt} />
        <span className="more-news-cta">Read Story →</span>
      </div>
    </div>
  );
}
