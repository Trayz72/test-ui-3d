import { products } from "../data/products";
import * as THREE from "three";

/** Distance along -Z between each pedestal in the corridor. */
export const CORRIDOR_SPACING = 9;
/** Z position of the first pedestal. */
export const CORRIDOR_START_Z = -4;
/** Alternating X offset so pedestals sit left/right of the walking line. */
export const PEDESTAL_X = 2.5;

export interface PedestalPlacement {
  index: number;
  position: [number, number, number];
}

export const pedestalPlacements: PedestalPlacement[] = products.map((_, index) => ({
  index,
  position: [
    index % 2 === 0 ? -PEDESTAL_X : PEDESTAL_X,
    0,
    CORRIDOR_START_Z - index * CORRIDOR_SPACING,
  ],
}));

export function pedestalZ(index: number) {
  return CORRIDOR_START_Z - index * CORRIDOR_SPACING;
}

export const CORRIDOR_END_Z = pedestalZ(products.length - 1) - 7;

/** Camera dolly path for the scroll-scrubbed corridor walk. */
export const cameraPath: THREE.Vector3[] = [
  new THREE.Vector3(0, 2.6, 9),
  new THREE.Vector3(0, 1.9, CORRIDOR_START_Z + 5),
  ...pedestalPlacements.map(
    (p) => new THREE.Vector3(-p.position[0] * 0.35, 1.7, p.position[2] + 2.2),
  ),
  new THREE.Vector3(0, 1.8, CORRIDOR_END_Z),
];

export const lookPath: THREE.Vector3[] = [
  new THREE.Vector3(0, 1.4, 0),
  new THREE.Vector3(0, 1.3, CORRIDOR_START_Z),
  ...pedestalPlacements.map((p) => new THREE.Vector3(p.position[0], 1.1, p.position[2])),
  new THREE.Vector3(0, 1.2, CORRIDOR_END_Z - 6),
];

export function focusCameraFor(index: number): { position: THREE.Vector3; target: THREE.Vector3 } {
  const p = pedestalPlacements[index];
  const [x, , z] = p.position;
  return {
    position: new THREE.Vector3(x * 0.35, 1.5, z + 3.1),
    target: new THREE.Vector3(x, 1.05, z),
  };
}

/** Slow push-in used during the pinned intro reveal. */
export const introCameraCurve = new THREE.CatmullRomCurve3([cameraPath[0], cameraPath[1]]);
export const introLookCurve = new THREE.CatmullRomCurve3([lookPath[0], lookPath[1]]);

/** Full scroll-scrubbed walk through the product corridor. */
export const corridorCameraCurve = new THREE.CatmullRomCurve3(cameraPath.slice(1));
export const corridorLookCurve = new THREE.CatmullRomCurve3(lookPath.slice(1));
