# NewsWave

A responsive, editorial-style news website built with **React**, **Vite**, and **Bootstrap 5**.

NewsWave consumes the **GNews API** for category-based headlines and optionally shows a **location-based weather pill** via the **OpenWeatherMap API**.

> App entry: `index.html` → `src/main.jsx` → `src/App.jsx`.

---

## Features

- **Top headlines by category** (Top Stories, World, Technology, Sports, Business, Health, Science, Entertainment) via GNews  
  - Categories are mapped in `src/api/useGNews.jsx` (`TAB_CATEGORY_MAP`, `GNEWS_TABS`).
- **Main banner carousel** that auto-rotates and supports manual dot navigation (`src/components/layout/MainBanner.jsx`).
- **Search UI** in the navbar with client-side filtering (title/description/source) (`src/components/layout/Navbar.jsx`, `src/components/SearchResults.jsx`).
- **Pagination** (with ellipsis) and a free-tier safeguard of **max 5 pages** (`src/components/Pagination.jsx`, `src/pages/HomePage.jsx`).
- **Language toggle (EN / HI)**
  - Language is used in API requests (`useGNews(category, apiKey, lang, page)` in `src/api/useGNews.jsx`) and in minimal UI strings (`src/components/layout/MainBanner.jsx`).
- **Weather widget (optional)** using browser geolocation with a fallback location if geolocation fails (`src/api/useWeather.js`, `src/components/WeatherWidget.jsx`).
- **Resilient UI states**: skeleton shimmer loading, error banner with retry, and fallback image handling (`src/api/useGNews.jsx`).

---

## Tech Stack

- **Frontend:** React 18 (`package.json`)
- **Build tool:** Vite 5 (`package.json`, `vite.config.js`)
- **Styling:** Bootstrap 5 + custom CSS (`src/App.jsx`, `src/**/*.css`)
- **Icons:** Ionicons loaded via CDN (`index.html`)
- **External APIs:**
  - GNews: `https://gnews.io/api/v4` (`src/api/useGNews.jsx`)
  - OpenWeatherMap: `https://api.openweathermap.org/data/2.5/weather` (`src/api/useWeather.js`)

---

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── public/
├── src/
│   ├── main.jsx              # React entrypoint
│   ├── App.jsx               # App shell (navbar/banner/home/footer)
│   ├── pages/
│   │   └── HomePage.jsx       # Main layout + pagination + search mode
│   ├── api/
│   │   ├── useGNews.jsx       # GNews hook + UI helpers (skeleton/error)
│   │   └── useWeather.js      # OpenWeatherMap hook
│   └── components/
│       ├── layout/            # Navbar, banner, footer, tabs
│       ├── cards/             # Article card variants
│       ├── Pagination.jsx
│       ├── SearchResults.jsx
│       └── WeatherWidget.jsx
└── eslint.config.js
```

## Prerequisites

- Node.js (LTS recommended)
- npm (ships with Node)

You’ll also need API keys for:

- GNews (required to load news)
- OpenWeatherMap (optional; only needed for the weather pill)

# Configuration (Environment Variables)
This project uses Vite-style environment variables (import.meta.env). Create a .env file in the project root:
```bash
# Required: GNews API key
VITE_GNEWS_API_KEY=your_gnews_api_key

# Optional: OpenWeatherMap API key
VITE_OWM_API_KEY=your_openweathermap_api_key
```
Where they are used:

- VITE_GNEWS_API_KEY
  - src/pages/HomePage.jsx (fallback value is "YOUR_GNEWS_API_KEY")
  - src/components/layout/MainBanner.jsx
  - Validated in src/api/useGNews.jsx (shows: “Add your GNews API key to .env (VITE_GNEWS_API_KEY).”)
- VITE_OWM_API_KEY
  - src/api/useWeather.js
 >Don’t commit .env to git.
### Install
```bash
npm install
```
### Start dev server
```bash
npm run dev
```
>Vite will print the local URL (typically http://localhost:5173).

#### Notes & Limitations
- Pagination is capped to 5 pages (MAX_PAGES = 5 in src/pages/HomePage.jsx) to align with the comment “free tier limit”.
- Search is client-side (filters the currently loaded page’s articles) (src/components/SearchResults.jsx).
- If OpenWeatherMap key is not provided, the weather widget simply won’t render (src/api/useWeather.js, src/components/WeatherWidget.jsx).
## Troubleshooting
### News is not loading / error banner shows
- Ensure you set VITE_GNEWS_API_KEY in .env.
- Restart the dev server after changing .env.
- If the API returns non-200, the error message shown comes from GNews (src/api/useGNews.jsx:176-191).
### Weather pill does not appear
- Add VITE_OWM_API_KEY to .env (src/api/useWeather.js:2).
- Ensure the browser grants geolocation permission; otherwise it falls back to default coordinates (DEFAULT_LAT/DEFAULT_LON in src/api/useWeather.js).
## Contributing
- Fork the repo
- Create a feature branch: git checkout -b feature/my-change
- Commit your changes
- Open a Pull Request
## Guidelines:
- Keep components small and reusable (see src/components/).
- Prefer colocated CSS files for styling consistency.
