import { Link } from "react-router-dom";

export function FinaleSection() {
  return (
    <section id="finale-section" className="finale-section">
      <div className="finale-section__inner">
        <span className="ue-eyebrow">The Full Collection</span>
        <h2>Take the Showroom Home</h2>
        <p>
          Every tumbler you just walked through — and the colorways that
          didn't make the corridor — live in the shop. Same craft, ready to
          carry.
        </p>
        <Link to="/shop" className="ue-btn ue-btn--solid">
          Enter the Shop
        </Link>
      </div>
    </section>
  );
}
