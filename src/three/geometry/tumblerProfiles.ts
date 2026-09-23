import * as THREE from "three";
import type { Product } from "../../data/products";

type ControlPoint = [radiusFactor: number, heightFactor: number];

interface ProfileSpec {
  baseRadius: number;
  height: number;
  controls: ControlPoint[];
}

const PROFILES: Record<Product["profile"], ProfileSpec> = {
  classic: {
    baseRadius: 0.34,
    height: 1.15,
    controls: [
      [0.0, 0.0],
      [0.78, 0.0],
      [0.88, 0.03],
      [0.92, 0.12],
      [0.92, 0.82],
      [0.85, 0.93],
      [0.8, 1.0],
    ],
  },
  taper: {
    baseRadius: 0.3,
    height: 0.95,
    controls: [
      [0.0, 0.0],
      [0.82, 0.0],
      [0.9, 0.05],
      [0.87, 0.4],
      [0.78, 0.75],
      [0.68, 0.95],
      [0.64, 1.0],
    ],
  },
  wide: {
    baseRadius: 0.36,
    height: 1.3,
    controls: [
      [0.0, 0.0],
      [0.88, 0.0],
      [0.98, 0.06],
      [1.0, 0.35],
      [0.97, 0.6],
      [0.92, 0.85],
      [0.95, 0.97],
      [0.9, 1.0],
    ],
  },
  sport: {
    baseRadius: 0.33,
    height: 1.05,
    controls: [
      [0.0, 0.0],
      [0.85, 0.0],
      [0.92, 0.08],
      [0.88, 0.25],
      [0.72, 0.42],
      [0.74, 0.5],
      [0.9, 0.62],
      [0.93, 0.85],
      [0.87, 0.97],
      [0.82, 1.0],
    ],
  },
};

/**
 * Builds the revolve profile (bottom→top) for a tumbler body as a smoothed
 * 2D spline, ready to feed into THREE.LatheGeometry.
 */
export function buildTumblerProfile(profile: Product["profile"]) {
  const spec = PROFILES[profile];
  const raw = spec.controls.map(
    ([r, h]) => new THREE.Vector2(r * spec.baseRadius, h * spec.height),
  );
  const curve = new THREE.SplineCurve(raw);
  const points = curve.getPoints(28);
  return { points, baseRadius: spec.baseRadius, height: spec.height };
}
