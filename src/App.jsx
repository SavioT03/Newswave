import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar     from "./components/layout/Navbar";
import MainBanner from "./components/layout/MainBanner";
import HomePage   from "./pages/HomePage";
import Footer     from "./components/layout/Footer";

export default function App() {
  const [lang, setLang]         = useState("en");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="site-wrapper">
      <Navbar
        lang={lang}
        setLang={setLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MainBanner lang={lang} />
      <HomePage lang={lang} searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}
