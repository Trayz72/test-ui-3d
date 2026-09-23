import { lazy, Suspense, useEffect } from "react";
import { NavBar } from "../components/homepage/NavBar";
import { IntroOverlay } from "../components/homepage/IntroOverlay";
import { CorridorCaptions } from "../components/homepage/CorridorCaptions";
import { FocusPanel } from "../components/homepage/FocusPanel";
import { FinaleSection } from "../components/homepage/FinaleSection";
import { ExperienceFallback } from "../components/homepage/ExperienceFallback";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useScrollExperience } from "../hooks/useScrollExperience";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useExperienceStore, scrollState } from "../state/experienceStore";
import { products } from "../data/products";
import "../styles/homepage.css";

const Experience = lazy(() => import("../three/Experience").then((m) => ({ default: m.Experience })));

export default function Home() {
  useDocumentTitle("UrbanEssentials — The Showroom");
  const resetToIntro = useExperienceStore((s) => s.resetToIntro);
  useEffect(() => {
    resetToIntro();
    scrollState.introProgress = 0;
    scrollState.corridorProgress = 0;
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useScrollExperience();

  const phase = useExperienceStore((s) => s.phase);
  const focusedIndex = useExperienceStore((s) => s.focusedIndex);
  useBodyScrollLock(phase === "focus");

  return (
    <div className="home-root">
      <a href="#finale-section" className="ue-skip-link">
        Skip the 3D showroom — go to the collection
      </a>

      <div className="canvas-layer">
        <ErrorBoundary fallback={<ExperienceFallback />}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </ErrorBoundary>
      </div>

      <NavBar />

      <main className="scroll-layer">
        <section id="intro-section" className="intro-section">
          <IntroOverlay />
        </section>

        <section
          id="corridor-section"
          className="corridor-section"
          style={{ height: `${products.length * 100}svh` }}
        />

        <FinaleSection />
      </main>

      {phase === "corridor" && <CorridorCaptions />}
      {phase === "focus" && focusedIndex !== null && <FocusPanel index={focusedIndex} />}

      <footer className="ue-footer">© {new Date().getFullYear()} URBANESSENTIALS — ORIGINAL DESIGN</footer>
    </div>
  );
}
