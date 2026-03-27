import { useState, useEffect, useCallback, useRef } from "react";

export const TAB_CATEGORY_MAP = {
  "Top Stories":   "general",
  "World":         "world",
  "Technology":    "technology",
  "Sports":        "sports",
  "Business":      "business",
  "Health":        "health",
  "Science":       "science",
  "Entertainment": "entertainment",
};

// Extract tab names
export const GNEWS_TABS = Object.keys(TAB_CATEGORY_MAP);

 
// Predefined colors for tags (cycled based on string hash)
const TAG_COLORS = ["#e63946","#457b9d","#22c55e","#f97316","#a855f7","#06b6d4","#f59e0b","#ec4899"];

export function tagColor(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return TAG_COLORS[h % TAG_COLORS.length];
}

export function TimeAgo({ iso }) {
  if (!iso) return null;

  const mins = Math.floor((Date.now() - new Date(iso)) / 60000);

  const label =
    mins < 1    ? "just now"
    : mins < 60   ? `${mins}m ago`
    : mins < 1440 ? `${Math.floor(mins / 60)}h ago`
    :               `${Math.floor(mins / 1440)}d ago`;

  return (
    <span style={{
      fontSize:"0.7rem",
      color:"#8a9bb0",
      fontFamily:"'Barlow Condensed',sans-serif",
      letterSpacing:"0.5px"
    }}>
      {label}
    </span>
  );
}

// loading block
export function SkeletonBlock({ style }) {
  return (
    <div
      style={{
        background:"linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)",
        backgroundSize:"200% 100%",
        animation:"shimmer 1.4s infinite",
        borderRadius:3,
        ...style
      }}
    />
  );
}

// shimmer animation globally
export function ShimmerKeyframes() {
  return (
    <style>
      {`@keyframes shimmer{
        0%{background-position:200% 0}
        100%{background-position:-200% 0}
      }`}
    </style>
  );
}

// Error UI with retry button
export function ErrorBanner({ message, onRetry }) {
  return (
    <div style={{ padding:"2rem 1rem", textAlign:"center", color:"#6c757d" }}>
      <div style={{ fontSize:"1.8rem", marginBottom:"0.5rem" }}>⚠️</div>

      <p style={{
        fontFamily:"'Barlow Condensed',sans-serif",
        fontSize:"0.85rem",
        letterSpacing:1,
        marginBottom:"1rem"
      }}>
        {message}
      </p>

      {/* Retry button only shows if handler is passed */}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background:"#e63946",
            color:"#fff",
            border:"none",
            padding:"7px 20px",
            borderRadius:2,
            cursor:"pointer",
            fontFamily:"'Barlow Condensed',sans-serif",
            fontSize:"0.78rem",
            letterSpacing:"1.5px",
            textTransform:"uppercase"
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Fallback image if API image fails
export const FALLBACK_IMG = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80";

// Replace broken image dynamically
export function safeImg(e) {
  e.target.src = FALLBACK_IMG;
}

// API base URL
const BASE_URL = "https://gnews.io/api/v4";

// Normalize API response into consistent structure
function normalise(raw, index) {
  return {
    id:          raw.url + index, // ensure unique key
    title:       raw.title       || "Untitled",
    description: raw.description || "",
    url:         raw.url,
    image:       raw.image       || FALLBACK_IMG,
    publishedAt: raw.publishedAt,
    source:      raw.source?.name || "News",
  };
}

export function useGNews(category = "general", apiKey = "", lang = "en", page = 1) {
  
  // main data state
  const [articles,      setArticles]      = useState([]);
  const [page1Articles, setPage1Articles] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);

  // used to cancel previous request when new one starts
  const abortRef = useRef(null);

  // main fetch logic (avoid unnecessary re-creation)
  const fetchNews = useCallback(async () => {

    // API key validation
    if (!apiKey || apiKey === "YOUR_GNEWS_API_KEY") {
      setError("Add your GNews API key to .env (VITE_GNEWS_API_KEY).");
      setLoading(false);
      return;
    }

    // cancel previous request if running
    if (abortRef.current) abortRef.current.abort();

    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}/top-headlines?category=${category}&lang=${lang}&max=10&page=${page}&apikey=${apiKey}`;

      const res = await fetch(url, { signal: abortRef.current.signal });

      // handle errors
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.errors?.[0] || `HTTP ${res.status}`);
      }

      const data = await res.json();

      // normalise(clean and reshapes)
      const normalised = (data.articles || []).map(normalise);
      setArticles(normalised);
      if (page === 1) setPage1Articles(normalised);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to fetch news.");
      }
    } finally {
      setLoading(false);
    }

  }, [category, apiKey, lang, page]);

  useEffect(() => {
    fetchNews();
    return () => abortRef.current?.abort();

  }, [fetchNews]);

  // Keep first page articles for stable UI sections
  const pinnedArticles = page1Articles.length > 0 ? page1Articles : articles;

  return {
    articles, 
    allArticles: articles, // alias (used in search)

    featuredArticle:  pinnedArticles[0]   ?? null,  // main banner
    topArticles:      pinnedArticles.slice(1, 3),
    moreNewsArticle:  pinnedArticles[3]   ?? null,
    gridArticles:     articles.slice(4, 10),        // paginated grid

    loading,
    error,
    refetch: fetchNews, // manual refresh
  };
}