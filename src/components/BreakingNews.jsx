import { SkeletonBlock, safeImg } from "../api/useGNews";
import "./BreakingNews.css";

function Skeleton() {
  return (
    <div className="breaking-news-item">
      <SkeletonBlock style={{ width: 22, height: 12, flexShrink: 0 }} />
      <SkeletonBlock style={{ width: 64, height: 48, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <SkeletonBlock style={{ height: 11, marginBottom: 6 }} />
        <SkeletonBlock style={{ height: 11, width: "70%" }} />
      </div>
    </div>
  );
}

export default function BreakingNews({
  articles = [],
  loading = false,
  onArticleClick,
}) {
  return (
    <aside className="breaking-news">
      <h2 className="breaking-news-heading">Top News</h2>
      <ul className="breaking-news-list">
        {loading
          ? [0, 1, 2].map((i) => (
              <li key={i}>
                <Skeleton />
              </li>
            ))
          : articles.slice(0, 2).map((article, number) => (
              <li key={article.id} className="breaking-news-item" style={{ cursor: "pointer" }}  onClick={() => onArticleClick && onArticleClick(article)}>
                <span className="breaking-news-rank">{number + 1}</span>
                <img src={article.image} alt="" className="breaking-news-img" onError={safeImg}/>
                <p className="breaking-news-text">{article.title}</p>
              </li>
            ))}
      </ul>
    </aside>
  );
}
