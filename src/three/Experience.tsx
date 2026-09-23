import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
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
      {/* synthetic studio env — gives the metal tumblers real reflections without an external HDR fetch */}
      <Environment resolution={128}>
        <Lightformer intensity={2.5} color="#ffffff" position={[0, 5, 4]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.1} color="#b8641c" position={[-6, 2, -2]} scale={[6, 6, 1]} />
        <Lightformer intensity={0.8} color="#ffffff" position={[6, 2, -2]} scale={[6, 6, 1]} />
      </Environment>
    </Canvas>
  );
}
