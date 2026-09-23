# UrbanEssentials — The Showroom

An original, scroll-driven 3D immersive homepage for UrbanEssentials, a
tumbler/drinkware brand. Built with React, TypeScript, React Three Fiber,
and GSAP ScrollTrigger.

The homepage is a single continuous scene: an intro reveal, a scroll-scrubbed
walk through a showroom corridor of procedurally-built 3D tumblers, a
click-to-inspect focus mode with colorway switching, and a transition into a
conventional `/shop` + `/product/:slug` flow backed by local dummy product
data (no backend, no Shopify integration).

## Stack

- React 19 + TypeScript + Vite
- `three` / `@react-three/fiber` / `@react-three/drei` / `@react-three/postprocessing`
- GSAP + ScrollTrigger for the scroll-linked camera and reveals
- zustand for the small piece of discrete UI state (phase, focused product, colorway)

## Structure

- `src/three/` — the 3D scene: procedural tumbler geometry (`geometry/`),
  the showroom environment, the scroll-driven camera rig, and the product
  corridor.
- `src/hooks/useScrollExperience.ts` — wires DOM scroll to the camera via
  GSAP ScrollTrigger.
- `src/state/experienceStore.ts` — zustand store for discrete UI state, plus
  a plain mutable `scrollState` object for the high-frequency scroll progress
  read every frame (kept out of React state to avoid re-renders).
- `src/pages/` — `Home` (the immersive experience), `Shop`, `ProductDetail`.
- `src/data/products.ts` — local dummy product catalog.

## Development

```bash
npm install
npm run dev
npm run build
```
