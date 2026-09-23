import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";
import { Preloader } from "./components/Preloader.tsx";

// StrictMode is intentionally omitted: its dev-only double-invoked effects
// fight with GSAP ScrollTrigger's imperative pin/scrub setup (duplicate
// triggers momentarily exist, corrupting scroll-distance calculations).
createRoot(document.getElementById("root")!).render(
  <Preloader>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Preloader>,
);
