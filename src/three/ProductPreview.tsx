import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, ContactShadows } from "@react-three/drei";
import type { Product } from "../data/products";
import { Tumbler } from "./Tumbler";

interface ProductPreviewProps {
  product: Product;
  colorwayIndex: number;
  interactive?: boolean;
}

export function ProductPreview({ product, colorwayIndex, interactive = false }: ProductPreviewProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.95, 2.5], fov: 36 }}
      gl={{ antialias: true }}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    >
      <color attach="background" args={["#efe9db"]} />
      <ambientLight intensity={0.85} color="#fffaf0" />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="#fff8ec" />
      <directionalLight position={[-4, 2, -3]} intensity={0.3} color="#b8641c" />
      <Suspense fallback={null}>
        <group position={[0, -0.1, 0]}>
          <Tumbler product={product} colorwayIndex={colorwayIndex} active spin={!interactive} />
        </group>
        <ContactShadows position={[0, -0.11, 0]} opacity={0.4} scale={4} blur={2.4} far={2} />
        {/* synthetic studio env — no external HDR fetch */}
        <Environment resolution={128}>
          <Lightformer intensity={2.4} color="#ffffff" position={[0, 3, 2]} scale={[4, 2, 1]} />
          <Lightformer intensity={0.8} color="#b8641c" position={[-3, 1, -2]} scale={[3, 3, 1]} />
        </Environment>
      </Suspense>
      {interactive && (
        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={1.4}
          maxDistance={3.6}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
        />
      )}
    </Canvas>
  );
}
