import { Link } from "react-router-dom";
import { NavBar } from "../components/homepage/NavBar";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page Not Found — UrbanEssentials");

  return (
    <div>
      <NavBar />
      <div
        className="ue-page-transition"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "1.2rem",
          padding: "0 1.5rem",
        }}
      >
        <span className="ue-eyebrow">404</span>
        <h1 style={{ fontSize: "clamp(2.6rem, 7vw, 4.4rem)" }}>Nothing Here</h1>
        <p style={{ maxWidth: "34ch", color: "var(--ue-ink-dim)", fontSize: "0.98rem", lineHeight: 1.5 }}>
          This page wandered off the shelf. Head back to the showroom or browse
          the full collection.
        </p>
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/" className="ue-btn ue-btn--solid">
            Back to the Showroom
          </Link>
          <Link to="/shop" className="ue-btn">
            Shop All
          </Link>
        </div>
      </div>
    </div>
  );
}
