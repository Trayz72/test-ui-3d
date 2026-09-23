import { CORRIDOR_END_Z, pedestalPlacements } from "./layout";

export function Showroom() {
  const floorLength = Math.abs(CORRIDOR_END_Z) + 20;
  const floorCenterZ = CORRIDOR_END_Z / 2;

  return (
    <>
      <fog attach="fog" args={["#f2ede0", 10, 40]} />
      <ambientLight intensity={0.32} color="#fffaf0" />
      <hemisphereLight args={["#ffffff", "#e6dfcd", 0.3]} />
      <directionalLight
        position={[6, 12, 6]}
        intensity={0.7}
        color="#fff8ec"
        castShadow
        shadow-mapSize={[512, 512]}
      />

      {/* studio floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, floorCenterZ]} receiveShadow>
        <planeGeometry args={[26, floorLength]} />
        <meshStandardMaterial color="#e6e0d1" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* per-pedestal warm spotlight */}
      {pedestalPlacements.map((p) => (
        <spotLight
          key={p.index}
          position={[p.position[0] * 0.6, 4.2, p.position[2] + 1.2]}
          target-position={p.position}
          angle={0.45}
          penumbra={0.7}
          intensity={2}
          distance={9}
          color="#fff3df"
        />
      ))}

      {/* editorial brass accent pillars */}
      {pedestalPlacements.map((p) => (
        <group key={`strip-${p.index}`}>
          <mesh position={[-9, 2.4, p.position[2]]}>
            <boxGeometry args={[0.06, 3.4, 0.06]} />
            <meshStandardMaterial color="#b8641c" metalness={0.75} roughness={0.28} />
          </mesh>
          <mesh position={[9, 2.4, p.position[2]]}>
            <boxGeometry args={[0.06, 3.4, 0.06]} />
            <meshStandardMaterial color="#b8641c" metalness={0.75} roughness={0.28} />
          </mesh>
        </group>
      ))}
    </>
  );
}
