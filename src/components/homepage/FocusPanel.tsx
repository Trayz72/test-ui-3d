import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { useExperienceStore } from "../../state/experienceStore";

interface FocusPanelProps {
  index: number;
}

export function FocusPanel({ index }: FocusPanelProps) {
  const product = products[index];
  const colorwayIndex = useExperienceStore((s) => s.colorwayIndex);
  const setColorway = useExperienceStore((s) => s.setColorway);
  const clearFocus = useExperienceStore((s) => s.clearFocus);
  const colorway = product.colorways[colorwayIndex];

  return (
    <div className="focus-panel">
      <div className="focus-panel__scrim" onClick={clearFocus} />
      <div className="focus-panel__body">
        <button className="focus-panel__close" onClick={clearFocus}>
          ← Back to Showroom
        </button>
        <span className="ue-eyebrow">
          {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
        </span>
        <h2 className="focus-panel__name">{product.name}</h2>
        <p className="focus-panel__tagline">{product.tagline}</p>
        <p className="focus-panel__desc">{product.description}</p>

        <div className="focus-panel__meta">
          <div>
            <strong>${product.price}</strong>
            Price
          </div>
          <div>
            <strong>{product.capacityOz} oz</strong>
            Capacity
          </div>
          <div>
            <strong>{colorway.name}</strong>
            Colorway
          </div>
        </div>

        <div className="focus-panel__swatches">
          {product.colorways.map((c, i) => (
            <button
              key={c.name}
              className={`focus-panel__swatch${i === colorwayIndex ? " focus-panel__swatch--active" : ""}`}
              style={{ background: c.hex }}
              aria-label={c.name}
              onClick={() => setColorway(i)}
            />
          ))}
        </div>

        <div className="focus-panel__actions">
          <Link to={`/product/${product.slug}`} className="ue-btn ue-btn--solid">
            View Product
          </Link>
          <button className="ue-btn" onClick={clearFocus}>
            Continue Walkthrough
          </button>
        </div>
      </div>
    </div>
  );
}
