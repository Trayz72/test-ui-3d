import { NavBar } from "../components/homepage/NavBar";
import { ProductCard } from "../components/shop/ProductCard";
import { products } from "../data/products";
import "../styles/shop.css";

export default function Shop() {
  return (
    <div>
      <NavBar />
      <div className="shop-page">
        <header className="shop-header">
          <span className="ue-eyebrow">Shop All</span>
          <h1>The Collection</h1>
          <p>
            The full tumbler line-up from the showroom walkthrough, plus the
            colorways that didn't make the floor. Drag any preview to inspect
            it in 3D.
          </p>
        </header>
        <div className="shop-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
