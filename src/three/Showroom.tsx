import { MeshReflectorMaterial } from "@react-three/drei";
import { CORRIDOR_END_Z, pedestalPlacements } from "./layout";

export function Showroom() {
  const floorLength = Math.abs(CORRIDOR_END_Z) + 20;
  const floorCenterZ = CORRIDOR_END_Z / 2;

  return (
    <>
      <fog attach="fog" args={["#08080a", 8, 34]} />
      <ambientLight intensity={0.18} color="#5a5a66" />
      <hemisphereLight args={["#3a3f52", "#08080a", 0.25]} />
      <directionalLight
        position={[6, 12, 6]}
        intensity={0.55}
        color="#f5f1ea"
        castShadow
        shadow-mapSize={[512, 512]}
      />

      {/* reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, floorCenterZ]} receiveShadow>
        <planeGeometry args={[26, floorLength]} />
        <MeshReflectorMaterial
          blur={[200, 60]}
          resolution={512}
          mixBlur={1}
          mixStrength={35}
          roughness={0.92}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#0c0c0f"
          metalness={0.4}
          mirror={0}
        />
      </mesh>

      {/* per-pedestal warm spotlight */}
      {pedestalPlacements.map((p) => (
        <spotLight
          key={p.index}
          position={[p.position[0] * 0.6, 4.2, p.position[2] + 1.2]}
          target-position={p.position}
          angle={0.45}
          penumbra={0.65}
          intensity={5}
          distance={9}
          color="#f4d9b8"
        />
      ))}

      {/* editorial light strips along the corridor */}
      {pedestalPlacements.map((p) => (
        <group key={`strip-${p.index}`}>
          <mesh position={[-9, 2.4, p.position[2]]}>
            <boxGeometry args={[0.06, 3.4, 0.06]} />
            <meshStandardMaterial
              color="#d98a3d"
              emissive="#d98a3d"
              emissiveIntensity={1.4}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[9, 2.4, p.position[2]]}>
            <boxGeometry args={[0.06, 3.4, 0.06]} />
            <meshStandardMaterial
              color="#d98a3d"
              emissive="#d98a3d"
              emissiveIntensity={1.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}
