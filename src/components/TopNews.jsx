import { SkeletonBlock, safeImg } from "../api/useGNews";
import "./TopNews.css";

function TopNewsItemSkeleton() {
  return (
    <div className="top-news-item">
      <SkeletonBlock style={{ width: 22, height: 12, flexShrink: 0 }} />
      <SkeletonBlock style={{ width: 64, height: 48, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <SkeletonBlock style={{ height: 11, marginBottom: 6 }} />
        <SkeletonBlock style={{ height: 11, width: "70%" }} />
      </div>
    </div>
  );
}

export default function TopNews({ articles = [], loading = false, onArticleClick }) {
  return (
    <aside className="top-news">
      <h2 className="top-news-heading">Top News</h2>
      <ul className="top-news-list">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <li key={i}><TopNewsItemSkeleton /></li>)
          : articles.map((item, idx) => (
              <li
                key={item.id}
                className="top-news-item"
                style={{ cursor: "pointer" }}
                onClick={() => onArticleClick?.(item)}
              >
                <span className="top-news-rank">{String(idx + 1).padStart(2, "0")}</span>
                <img src={item.image} alt="" className="top-news-img" onError={safeImg} />
                <p className="top-news-text">{item.title}</p>
              </li>
            ))
        }
      </ul>
    </aside>
  );
}
