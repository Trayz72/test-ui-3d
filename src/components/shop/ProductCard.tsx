import { Link } from "react-router-dom";
import type { Product } from "../../data/products";
import { ProductPreview } from "../../three/ProductPreview";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-card__canvas">
        <ProductPreview product={product} colorwayIndex={0} />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__tagline">{product.tagline}</p>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price}</span>
          <div className="product-card__swatches">
            {product.colorways.map((c) => (
              <span key={c.name} className="product-card__dot" style={{ background: c.hex }} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
