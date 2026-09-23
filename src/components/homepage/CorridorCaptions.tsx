import { products } from "../../data/products";
import { useExperienceStore } from "../../state/experienceStore";

export function CorridorCaptions() {
  const activeIndex = useExperienceStore((s) => s.activeCaptionIndex);
  const product = products[activeIndex];

  return (
    <>
      <div className="corridor-captions" key={product.id}>
        <div className="corridor-captions__index">
          {String(activeIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
        </div>
        <h2 className="corridor-captions__name">{product.name}</h2>
        <p className="corridor-captions__tagline">{product.tagline}</p>
        <div className="corridor-captions__hint">Click the tumbler to inspect</div>
      </div>
      <div className="corridor-progress">
        {products.map((p, i) => (
          <span
            key={p.id}
            className={`corridor-progress__dot${i === activeIndex ? " corridor-progress__dot--active" : ""}`}
          />
        ))}
      </div>
    </>
  );
}
