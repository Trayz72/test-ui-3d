import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="ue-nav">
      <Link to="/" className="ue-nav__mark">
        URBANESSENTIALS
      </Link>
      <Link to="/shop" className="ue-nav__link">
        SHOP ALL
      </Link>
    </nav>
  );
}
