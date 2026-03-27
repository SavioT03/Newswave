import { useState, useRef, useEffect } from "react";
import WeatherWidget from "../WeatherWidget";
import "./Navbar.css";

export default function Navbar({ lang, setLang, searchQuery, setSearchQuery }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchToggle = () => {
    setSearchOpen((prev) => {
      if (prev) setSearchQuery(""); // clear on close
      return !prev;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container-fluid">
        <a href="#" className="nav-brand">NEWSWAVE</a>

        {/* Search bar — expands inline on desktop */}
        <div className={`nav-search${searchOpen ? " nav-search--open" : ""}`}>
          <input
            ref={inputRef}
            type="text"
            className="nav-search-input"
            placeholder="Search articles…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search articles"
          />
        </div>

        <div className="nav-actions">
          <WeatherWidget />

          {/* Search toggle button */}
          <button
            className={`nav-icon-btn${searchOpen ? " nav-icon-btn--active" : ""}`}
            onClick={handleSearchToggle}
            aria-label="Toggle search"
            title="Search"
          >
            {searchOpen ? (
              <ion-icon name="close-outline"></ion-icon>
            ) : (
              <ion-icon name="search-outline"></ion-icon>
            )}
          </button>

          <button
            className="lang-toggle"
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            title={lang === "en" ? "Switch to Hindi" : "Switch to English"}
          >
            <span className={lang === "en" ? "lang-active" : ""}>EN</span>
            <span className="lang-sep">|</span>
            <span className={lang === "hi" ? "lang-active" : ""}>हि</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
