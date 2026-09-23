import * as THREE from "three";

const cache = new Map<string, THREE.CanvasTexture>();

/**
 * Draws a small screen-printed wordmark for the label band wrapped around
 * a tumbler. Cached by (name, accent) so re-renders don't repaint canvases.
 */
export function getLabelTexture(name: string, accent: string): THREE.CanvasTexture {
  const key = `${name}__${accent}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  // monogram mark
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 92, 46, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.font = "600 44px Inter, sans-serif";
  ctx.fillText("UE", canvas.width / 2, 96);

  // wordmark
  ctx.fillStyle = accent;
  ctx.font = "400 34px 'Bebas Neue', sans-serif";
  ctx.save();
  ctx.letterSpacing = "10px";
  ctx.fillText(name.toUpperCase(), canvas.width / 2, 190);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  cache.set(key, texture);
  return texture;
}
