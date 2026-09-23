import { Link } from "react-router-dom";
import { useCartCount, useCartStore } from "../../state/cartStore";

export function NavBar() {
  const count = useCartCount();
  const openCart = useCartStore((s) => s.openCart);

  return (
    <nav className="ue-nav">
      <Link to="/" className="ue-nav__mark">
        URBANESSENTIALS
      </Link>
      <div className="ue-nav__right">
        <Link to="/shop" className="ue-nav__link">
          SHOP
        </Link>
        <button className="ue-nav__cart" onClick={openCart} aria-label={`Open bag, ${count} items`}>
          BAG
          {count > 0 && <span className="ue-nav__cart-badge">{count}</span>}
        </button>
      </div>
    </nav>
  );
}
