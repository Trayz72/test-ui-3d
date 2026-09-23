interface Canvas3DFallbackProps {
  label?: string;
}

/** Shown in place of a 3D canvas if WebGL isn't available or the scene crashes. */
export function Canvas3DFallback({ label = "3D preview unavailable" }: Canvas3DFallbackProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "0.6rem",
        background: "var(--ue-surface)",
        color: "var(--ue-ink-dim)",
        textAlign: "center",
        padding: "1.5rem",
      }}
    >
      <span className="ue-eyebrow">UrbanEssentials</span>
      <p style={{ fontSize: "0.85rem", maxWidth: "22rem", margin: 0 }}>{label}</p>
    </div>
  );
}
