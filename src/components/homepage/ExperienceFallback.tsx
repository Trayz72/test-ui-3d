import { Link } from "react-router-dom";

/** Shown in place of the 3D showroom if WebGL isn't available or the scene crashes. */
export function ExperienceFallback() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "1.2rem",
        padding: "0 1.5rem",
        background: "var(--ue-bg)",
      }}
    >
      <span className="ue-eyebrow">UrbanEssentials</span>
      <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 4.4rem)" }}>Built for the Everyday</h1>
      <p style={{ maxWidth: "34ch", color: "var(--ue-ink-dim)", fontSize: "0.98rem", lineHeight: 1.5 }}>
        The 3D showroom couldn't start on this device or browser. You can still
        browse the full collection below.
      </p>
      <Link to="/shop" className="ue-btn ue-btn--solid">
        Browse the Collection
      </Link>
    </div>
  );
}
