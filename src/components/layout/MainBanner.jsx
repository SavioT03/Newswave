import { useState, useEffect } from "react";
import { useGNews } from "../../api/useGNews";
import "./MainBanner.css";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY || "";

// Minimal UI string translations
const UI_STRINGS = {
  en: { readStory: "Read Story", today: "Today" },
  hi: { readStory: "पूरी खबर पढ़ें", today: "आज" },
};

export default function MainBanner({ lang = "en" }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animKey, setAnimKey]   = useState(0);

  // Fetch top headlines based on selected language
  const { articles, loading } = useGNews("general", API_KEY, lang);

  // Reset carousel when language changes
  useEffect(() => {
    setActiveSlide(0);
    setAnimKey((k) => k + 1);
  }, [lang]);

  // Auto-slide logic (runs every 6s)
  useEffect(() => {
    if (!articles || articles.length === 0) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % articles.length);
      setAnimKey((k) => k + 1); 
    }, 6000);

    return () => clearInterval(timer);
  }, [articles?.length]);

  // Manual navigation (dot click)
  const goTo = (i) => {
    setActiveSlide(i);
    setAnimKey((k) => k + 1);
  };

  // Simple loading state (keeps layout stable)
  if (loading || !articles || articles.length === 0) {
    return <section className="main-banner main-banner-loading" />;
  }

  const slide = articles[activeSlide];
  const ui    = UI_STRINGS[lang] ?? UI_STRINGS.en;

  // Format date based on language
  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString(
          lang === "hi" ? "hi-IN" : "en-US",
          { month: "short", day: "numeric", year: "numeric" }
        )
      : ui.today;

  return (
    <section className="main-banner">
      {/* Background image changes per slide */}
      <img
        key={`img-${activeSlide}`}
        src={slide.image}
        alt={slide.title}
        className="main-banner_img"
      />

      <div className="main-banner_overlay" />

      {/* Content block */}
      <div className="main-banner_content" key={`c-${animKey}`}>
        <span className="main-banner_source">{slide.source}</span>

        <p className="main-banner_date">
          {formatDate(slide.publishedAt)}
        </p>

        <h1 className="main-banner_title">{slide.title}</h1>

        {slide.description && (
          <p className="main-banner_desc">{slide.description}</p>
        )}
        <a
          href={slide.url}
          target="_blank"
          rel="noopener noreferrer"
          className="main-banner_cta"
        >
          {ui.readStory}
        </a>
      </div>

      {/* Navigation dots */}
      <div className="main-banner_dots">
        {articles.map((_, i) => (
          <button
            key={i}
            className={`main-banner_dot${activeSlide === i ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}