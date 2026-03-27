import { useState, useEffect, useRef } from "react";
import {
  useGNews,
  GNEWS_TABS,
  TAB_CATEGORY_MAP,
  ShimmerKeyframes,
  ErrorBanner
} from "../api/useGNews";

import CategoryTabs  from "../components/layout/CategoryTabs";
import CoverCard     from "../components/cards/CoverCard";
import SideCard      from "../components/cards/SideCard";
import PhotoCard     from "../components/cards/PhotoCard";
import TrendCard     from "../components/cards/TrendCard";
import StoryCard     from "../components/cards/StoryCard";
import BreakingNews  from "../components/BreakingNews";
import BigStory      from "../components/BigStory";
import MoreNews      from "../components/MoreNews";
import SearchResults from "../components/SearchResults";
import Pagination    from "../components/Pagination";

import "./HomePage.css";
const API_KEY   = import.meta.env.VITE_GNEWS_API_KEY || "YOUR_GNEWS_API_KEY";

// free tier limit → max 5 pages
const MAX_PAGES = 5;

// Opens article in new tab safely
function openArticle(article) {
  if (article?.url) {
    window.open(article.url, "_blank", "noopener,noreferrer");
  }
}

/*
 * Article distribution per page
 *   [0]   → BigStory (main banner)
 *   [1-2] → BreakingNews (top side rail)
 *   [3]   → MoreNews panel
 *   [4-9] → Grid cards (rows 1–3)
 */
export default function HomePage({ lang = "en", searchQuery = "" }) {

  const [activeTab, setActiveTab] = useState(GNEWS_TABS[0]);

  const [currentPage, setCurrentPage] = useState(1);

  // Ref used to scroll back to top on page change
  const mainRef = useRef(null);

  // Convert tab name → API category
  const category = TAB_CATEGORY_MAP[activeTab] ?? "general";

  // Fetch news data (re-runs when category, lang, or page changes)
  const {
    featuredArticle,
    gridArticles,
    topArticles,
    moreNewsArticle,
    allArticles,
    loading,
    error,
    refetch,
  } = useGNews(category, API_KEY, lang, currentPage);

  // Reset pagination when category or language changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, lang]);

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Use skeleton placeholders while loading
  const slots = loading ? Array(6).fill(null) : gridArticles;

  // Handle page change + scroll to top
  const handlePageChange = (page) => {
    const p = Math.max(1, Math.min(page, MAX_PAGES));
    setCurrentPage(p);

    // Smooth scroll back to top of content
    mainRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  // Determine if user is actively searching
  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      {/* Shimmer animation*/}
      <ShimmerKeyframes />

      {/* Category navigation tabs */}
      <CategoryTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="home-main" ref={mainRef}>
        <div className="container-xl px-3">

          {/* Error state (with retry option) */}
          {error && (
            <ErrorBanner message={error} onRetry={refetch} />
          )}

          {isSearching ? (
            /* ── Search mode (overrides normal layout) ── */
            <SearchResults
              query={searchQuery}
              articles={allArticles}
              onArticleClick={openArticle}
            />
          ) : (
            <>
              {/* Row 1 — cover cards + breaking news */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-5 col-lg-4">
                  <CoverCard
                    article={slots[0]}
                    height={280}
                    titleSize="1.05rem"
                    onClick={openArticle}
                  />
                </div>
                <div className="col-12 col-md-4 col-lg-3">
                  <CoverCard
                    article={slots[1]}
                    height={280}
                    titleSize="0.9rem"
                    onClick={openArticle}
                  />
                </div>
                <div className="col-12 col-md-3 col-lg-5">
                  <BreakingNews
                    articles={topArticles}
                    loading={loading}
                    onArticleClick={openArticle}
                  />
                </div>
              </div>
              <hr className="section-divider" />
              {/* Row 2 — side + trend */}
              <div className="row g-3 mb-3 align-items-stretch">
                <div className="col-12 col-md-7">
                  <SideCard
                    article={slots[2]}
                    onClick={openArticle}
                  />
                </div>
                <div className="col-12 col-md-5">
                  <TrendCard
                    article={slots[3]}
                    onClick={openArticle}
                  />
                </div>
              </div>
              <hr className="section-divider" />
              {/* Row 3 — story + photo */}
              <div className="row g-3 mb-3 align-items-stretch">
                <div className="col-12 col-sm-6">
                  <StoryCard
                    article={slots[4]}
                    height={215}
                    onClick={openArticle}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <PhotoCard
                    article={slots[5]}
                    imgHeight={140}
                    onClick={openArticle}
                  />
                </div>
              </div>
              <hr className="section-divider" />
              {/* Row 4 — main highlight section */}
              <div className="row g-3 mb-2 align-items-stretch">
                <div className="col-12 col-lg-8">
                  <BigStory
                    article={featuredArticle}
                    onClick={openArticle}
                  />
                </div>
                <div className="col-12 col-lg-4">
                  <MoreNews
                    article={moreNewsArticle}
                    onClick={openArticle}
                  />
                </div>
              </div>
              {/* Pagination controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={MAX_PAGES}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}