import { useState } from "react";
import { useCartStore } from "../state/cartStore";
import { products } from "../data/products";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const closeCart = useCartStore((s) => s.closeCart);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const colorway = product?.colorways[item.colorwayIndex];
      if (!product || !colorway) return null;
      return { item, product, colorway };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.item.quantity, 0);

  return (
    <div className={`cart-drawer${isOpen ? " cart-drawer--open" : ""}`} aria-hidden={!isOpen}>
      <div className="cart-drawer__scrim" onClick={closeCart} />
      <div className="cart-drawer__panel">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Bag</h2>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close bag">
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <p className="cart-drawer__empty">Your bag is empty. Add something from the collection.</p>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {lines.map(({ item, product, colorway }) => (
                <li key={`${item.productId}-${item.colorwayIndex}`} className="cart-drawer__line">
                  <span
                    className="cart-drawer__swatch"
                    style={{ background: colorway.hex }}
                    aria-hidden="true"
                  />
                  <div className="cart-drawer__line-info">
                    <span className="cart-drawer__line-name">{product.name}</span>
                    <span className="cart-drawer__line-meta">{colorway.name}</span>
                    <div className="cart-drawer__qty">
                      <button
                        aria-label={`Decrease quantity of ${product.name}`}
                        onClick={() =>
                          setQuantity(item.productId, item.colorwayIndex, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() =>
                          setQuantity(item.productId, item.colorwayIndex, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-drawer__line-right">
                    <span className="cart-drawer__line-price">
                      ${product.price * item.quantity}
                    </span>
                    <button
                      className="cart-drawer__remove"
                      onClick={() => removeItem(item.productId, item.colorwayIndex)}
                      aria-label={`Remove ${product.name} from bag`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {checkoutMessage ? (
                <p className="cart-drawer__notice">
                  This is a demo storefront — checkout isn't wired up yet.
                </p>
              ) : (
                <button
                  className="ue-btn ue-btn--solid cart-drawer__checkout"
                  onClick={() => setCheckoutMessage(true)}
                >
                  Checkout
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
