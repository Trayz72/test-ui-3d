import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets scroll position on every route change — SPA navigation keeps it otherwise. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
