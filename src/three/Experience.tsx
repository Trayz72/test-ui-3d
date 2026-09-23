import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Showroom } from "./Showroom";
import { ProductCorridor } from "./ProductCorridor";
import { CameraRig } from "./CameraRig";
import { introCameraCurve } from "./layout";

export function Experience() {
  const start = introCameraCurve.getPoint(0);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [start.x, start.y, start.z], fov: 42, near: 0.1, far: 60 }}
    >
      <color attach="background" args={["#f2ede0"]} />
      <Showroom />
      <ProductCorridor />
      <CameraRig />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.25} luminanceThreshold={0.88} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.28} />
      </EffectComposer>
    </Canvas>
  );
}
