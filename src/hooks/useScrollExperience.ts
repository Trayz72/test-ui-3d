import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperienceStore, scrollState } from "../state/experienceStore";
import { products } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires the DOM scroll track to the 3D camera: an intro pin (reveal push-in)
 * followed by a pinned corridor section whose scroll progress drives the
 * camera dolly through the showroom. High-frequency values are written
 * straight to `scrollState` (read in useFrame) to avoid React re-renders;
 * only discrete changes (phase, active caption) go through zustand.
 */
export function useScrollExperience() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "intro",
        trigger: "#intro-section",
        start: "top top",
        end: "+=70%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          scrollState.introProgress = self.progress;
          const copy = document.querySelector<HTMLElement>(".intro-copy");
          if (copy) {
            copy.style.opacity = String(Math.max(0, 1 - self.progress * 1.4));
            copy.style.transform = `translateY(${self.progress * -50}px)`;
            copy.style.pointerEvents = self.progress > 0.05 ? "none" : "auto";
          }
        },
      });

      ScrollTrigger.create({
        id: "corridor",
        trigger: "#corridor-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          scrollState.corridorProgress = self.progress;
          const idx = Math.min(
            products.length - 1,
            Math.max(0, Math.round(self.progress * (products.length - 1))),
          );
          const store = useExperienceStore.getState();
          if (store.activeCaptionIndex !== idx) store.setActiveCaptionIndex(idx);
        },
        onEnter: () => {
          const store = useExperienceStore.getState();
          if (store.phase !== "focus") store.setPhase("corridor");
        },
        onEnterBack: () => {
          const store = useExperienceStore.getState();
          if (store.phase !== "focus") store.setPhase("corridor");
        },
        onLeave: () => {
          const store = useExperienceStore.getState();
          if (store.phase !== "focus") store.setPhase("finale");
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, []);
}
