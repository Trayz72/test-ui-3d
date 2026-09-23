import { lazy, Suspense, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { NavBar } from "../components/homepage/NavBar";
import { getProductBySlug } from "../data/products";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Canvas3DFallback } from "../components/Canvas3DFallback";
import { useCartStore } from "../state/cartStore";
import "../styles/shop.css";

const ProductPreview = lazy(() =>
  import("../three/ProductPreview").then((m) => ({ default: m.ProductPreview })),
);

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [colorwayIndex, setColorwayIndex] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useDocumentTitle(product ? `${product.name} — UrbanEssentials` : "UrbanEssentials");

  if (!product) return <Navigate to="/shop" replace />;

  const colorway = product.colorways[colorwayIndex];

  return (
    <div>
      <NavBar />
      <div className="product-page ue-page-transition">
        <div className="product-page__stage">
          <ErrorBoundary fallback={<Canvas3DFallback label={product.name} />}>
            <Suspense fallback={null}>
              <ProductPreview product={product} colorwayIndex={colorwayIndex} interactive />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="product-page__info">
          <Link to="/shop" className="product-page__back">
            ← Back to Shop
          </Link>
          <span className="ue-eyebrow">{colorway.name}</span>
          <h1 className="product-page__name">{product.name}</h1>
          <span className="product-page__price">${product.price}</span>
          <p className="product-page__desc">{product.description}</p>

          <div className="product-page__meta">
            <div>
              <strong>{product.capacityOz} oz</strong>
              Capacity
            </div>
            <div>
              <strong>{product.material}</strong>
              Material
            </div>
          </div>

          <div className="product-page__swatch-row">
            {product.colorways.map((c, i) => (
              <button
                key={c.name}
                className={`product-page__swatch${i === colorwayIndex ? " product-page__swatch--active" : ""}`}
                style={{ background: c.hex }}
                aria-label={c.name}
                onClick={() => setColorwayIndex(i)}
              />
            ))}
          </div>

          <div className="product-page__actions">
            <button
              className="ue-btn ue-btn--solid"
              onClick={() => addItem(product.id, colorwayIndex)}
            >
              Add to Bag
            </button>
          </div>
          <span className="product-page__hint">Drag to rotate · Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}
