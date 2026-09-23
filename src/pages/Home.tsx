import { useEffect } from "react";
import { Experience } from "../three/Experience";
import { NavBar } from "../components/homepage/NavBar";
import { IntroOverlay } from "../components/homepage/IntroOverlay";
import { CorridorCaptions } from "../components/homepage/CorridorCaptions";
import { FocusPanel } from "../components/homepage/FocusPanel";
import { FinaleSection } from "../components/homepage/FinaleSection";
import { useScrollExperience } from "../hooks/useScrollExperience";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useExperienceStore, scrollState } from "../state/experienceStore";
import { products } from "../data/products";
import "../styles/homepage.css";

export default function Home() {
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
      <div className="canvas-layer">
        <Experience />
      </div>

      <NavBar />

      <main className="scroll-layer">
        <section id="intro-section" className="intro-section">
          <IntroOverlay />
        </section>

        <section
          id="corridor-section"
          className="corridor-section"
          style={{ height: `${products.length * 100}vh` }}
        />

        <FinaleSection />
      </main>

      {phase === "corridor" && <CorridorCaptions />}
      {phase === "focus" && focusedIndex !== null && <FocusPanel index={focusedIndex} />}

      <footer className="ue-footer">© {new Date().getFullYear()} URBANESSENTIALS — ORIGINAL DESIGN</footer>
    </div>
  );
}
