interface PedestalProps {
  active?: boolean;
  dimmed?: boolean;
}

export function Pedestal({ active = false, dimmed = false }: PedestalProps) {
  return (
    <group>
      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.62, 0.72, 0.7, 48]} />
        <meshStandardMaterial
          color="#2b2620"
          metalness={0.2}
          roughness={0.65}
          transparent={dimmed}
          opacity={dimmed ? 0.35 : 1}
        />
      </mesh>
      <mesh position={[0, 0.705, 0]} receiveShadow>
        <cylinderGeometry args={[0.64, 0.64, 0.02, 48]} />
        <meshStandardMaterial
          color={active ? "#d9822f" : "#b8641c"}
          emissive={active ? "#d9822f" : "#000000"}
          emissiveIntensity={active ? 0.5 : 0}
          metalness={0.6}
          roughness={0.35}
          transparent={dimmed}
          opacity={dimmed ? 0.2 : 1}
        />
      </mesh>
    </group>
  );
}
