import { create } from "zustand";
import { products } from "../data/products";

export type ExperiencePhase = "intro" | "corridor" | "focus" | "finale";

interface ExperienceState {
  hasEntered: boolean;
  phase: ExperiencePhase;
  focusedIndex: number | null;
  colorwayIndex: number;
  activeCaptionIndex: number;
  enter: () => void;
  setPhase: (phase: ExperiencePhase) => void;
  focusProduct: (index: number) => void;
  clearFocus: () => void;
  setColorway: (index: number) => void;
  setActiveCaptionIndex: (index: number) => void;
  resetToIntro: () => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  hasEntered: false,
  phase: "intro",
  focusedIndex: null,
  colorwayIndex: 0,
  activeCaptionIndex: 0,
  enter: () => set({ hasEntered: true, phase: "corridor" }),
  setPhase: (phase) => set({ phase }),
  focusProduct: (index) =>
    set({
      focusedIndex: Math.max(0, Math.min(products.length - 1, index)),
      colorwayIndex: 0,
      phase: "focus",
    }),
  clearFocus: () => set({ focusedIndex: null, phase: "corridor" }),
  setColorway: (index) => set({ colorwayIndex: index }),
  setActiveCaptionIndex: (index) => set({ activeCaptionIndex: index }),
  resetToIntro: () =>
    set({
      hasEntered: false,
      phase: "intro",
      focusedIndex: null,
      colorwayIndex: 0,
      activeCaptionIndex: 0,
    }),
}));

/**
 * High-frequency scroll/camera values live outside React/zustand so GSAP's
 * ScrollTrigger onUpdate (running at scroll/rAF rate) never triggers a
 * React re-render — the R3F camera rig reads this ref directly in useFrame.
 */
export const scrollState = {
  /** 0..1 progress through the whole corridor scroll track */
  corridorProgress: 0,
  /** 0..1 progress through the intro pin */
  introProgress: 0,
};
