export interface Colorway {
  name: string;
  hex: string;
  accent: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  capacityOz: number;
  material: string;
  colorways: Colorway[];
  /** silhouette profile driving the procedural lathe geometry */
  profile: "classic" | "taper" | "wide" | "sport";
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "ridgeline-20",
    name: "The Ridgeline",
    tagline: "Everyday carry, engineered.",
    description:
      "Double-wall insulated core with a knurled grip band. Built for the commute, tuned for the trail.",
    price: 38,
    capacityOz: 20,
    material: "18/8 Stainless — Powder Coat",
    profile: "classic",
    colorways: [
      { name: "Onyx", hex: "#141416", accent: "#d98a3d" },
      { name: "Bone", hex: "#e9e3d6", accent: "#141416" },
      { name: "Rust", hex: "#a4501f", accent: "#141416" },
    ],
  },
  {
    id: "p2",
    slug: "motion-32",
    name: "The Motion",
    tagline: "High capacity. Low profile.",
    description:
      "A wide-mouth silhouette designed for all-day hydration, with a tapered base that clears any cupholder.",
    price: 46,
    capacityOz: 32,
    material: "18/8 Stainless — Matte Ceramic",
    profile: "wide",
    colorways: [
      { name: "Slate", hex: "#3a3f45", accent: "#f4a94f" },
      { name: "Moss", hex: "#4b5142", accent: "#e9e3d6" },
      { name: "Onyx", hex: "#141416", accent: "#f4a94f" },
    ],
  },
  {
    id: "p3",
    slug: "summit-14",
    name: "The Summit",
    tagline: "Compact. Uncompromising.",
    description:
      "A slim taper built for one-hand carry without sacrificing the thermal core that defines the line.",
    price: 32,
    capacityOz: 14,
    material: "18/8 Stainless — Gloss",
    profile: "taper",
    colorways: [
      { name: "Ember", hex: "#d98a3d", accent: "#141416" },
      { name: "Onyx", hex: "#141416", accent: "#d98a3d" },
      { name: "Bone", hex: "#e9e3d6", accent: "#a4501f" },
    ],
  },
  {
    id: "p4",
    slug: "commuter-24",
    name: "The Commuter",
    tagline: "Built for the daily grind.",
    description:
      "A sport-contoured body with a reinforced base ring — the workhorse of the collection.",
    price: 42,
    capacityOz: 24,
    material: "18/8 Stainless — Soft Touch",
    profile: "sport",
    colorways: [
      { name: "Bone", hex: "#e9e3d6", accent: "#141416" },
      { name: "Slate", hex: "#3a3f45", accent: "#d98a3d" },
      { name: "Rust", hex: "#a4501f", accent: "#e9e3d6" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
