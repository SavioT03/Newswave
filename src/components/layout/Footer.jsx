import { useState } from "react";
import "./Footer.css";

const footerLinks = ["Home", "News", "Sport", "Tech", "Earth", "Auto"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-links">
          {footerLinks.map((link) => (
            <a key={link} style={{ textDecoration: 'none' }} href="#" className="footer-link">{link}</a>
          ))}
        </div>

        <div className="footer-subscribe">
          <input
            type="email"
            className="footer-email"
            placeholder="Enter Your E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
          />
          <button className="btn-subscribe" onClick={handleSubscribe}>
            {subscribed ? "✓ Done!" : "Subscribe"}
          </button>
        </div>

        <div className="footer-brand">NEWSWAVE</div>
        <p className="footer-copy">
          Copyright © 2026 "NEWSWAVE" · Not responsible for the content of external sites.
        </p>
      </div>
    </footer>
  );
}
