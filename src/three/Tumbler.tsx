import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group, Mesh } from "three";
import type { Product } from "../data/products";
import { buildTumblerProfile } from "./geometry/tumblerProfiles";
import { getLabelTexture } from "./textures/labelTexture";

interface TumblerProps {
  product: Product;
  colorwayIndex: number;
  active?: boolean;
  dimmed?: boolean;
  spin?: boolean;
  onSelect?: () => void;
  onHover?: (hovered: boolean) => void;
}

export function Tumbler({
  product,
  colorwayIndex,
  active = false,
  dimmed = false,
  spin = true,
  onSelect,
  onHover,
}: TumblerProps) {
  const groupRef = useRef<Group>(null);
  const bodyRef = useRef<Mesh>(null);
  const hoverRef = useRef(false);

  const colorway = product.colorways[colorwayIndex] ?? product.colorways[0];

  const { geometry, baseRadius, height } = useMemo(() => {
    const { points, baseRadius, height } = buildTumblerProfile(product.profile);
    const geo = new THREE.LatheGeometry(points, 56);
    geo.computeVertexNormals();
    return { geometry: geo, baseRadius, height };
  }, [product.profile]);

  const labelTexture = useMemo(
    () => getLabelTexture(product.name, colorway.accent),
    [product.name, colorway.accent],
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (spin && !active) {
      groupRef.current.rotation.y += delta * 0.18;
    }
    if (spin && active && !hoverRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
    const targetScale = hoverRef.current && !active ? 1.06 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 8,
    );
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        hoverRef.current = true;
        onHover?.(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        hoverRef.current = false;
        onHover?.(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* body */}
      <mesh ref={bodyRef} geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={colorway.hex}
          metalness={0.82}
          roughness={0.28}
          clearcoat={0.55}
          clearcoatRoughness={0.2}
          transparent={dimmed}
          opacity={dimmed ? 0.28 : 1}
        />
      </mesh>

      {/* label band */}
      <mesh position={[0, height * 0.52, 0]} rotation={[0, Math.PI * 0.15, 0]}>
        <cylinderGeometry
          args={[baseRadius * 1.001, baseRadius * 1.001, height * 0.22, 56, 1, true, -0.9, 1.8]}
        />
        <meshBasicMaterial
          map={labelTexture}
          transparent
          opacity={dimmed ? 0.15 : 0.92}
          toneMapped={false}
        />
      </mesh>

      {/* lid */}
      <group position={[0, height, 0]}>
        <mesh position={[0, height * 0.05, 0]} castShadow>
          <cylinderGeometry args={[baseRadius * 0.66, baseRadius * 0.78, height * 0.1, 32]} />
          <meshPhysicalMaterial
            color="#16161a"
            metalness={0.4}
            roughness={0.55}
            transparent={dimmed}
            opacity={dimmed ? 0.28 : 1}
          />
        </mesh>
        <mesh position={[0, height * 0.11, 0]}>
          <torusGeometry args={[baseRadius * 0.58, height * 0.012, 12, 32]} />
          <meshStandardMaterial
            color={colorway.accent}
            metalness={0.6}
            roughness={0.35}
            transparent={dimmed}
            opacity={dimmed ? 0.2 : 1}
          />
        </mesh>
      </group>

      {/* base ring */}
      <mesh position={[0, height * 0.015, 0]}>
        <cylinderGeometry args={[baseRadius * 0.95, baseRadius * 0.9, height * 0.03, 40]} />
        <meshStandardMaterial
          color="#111114"
          metalness={0.2}
          roughness={0.8}
          transparent={dimmed}
          opacity={dimmed ? 0.2 : 1}
        />
      </mesh>
    </group>
  );
}
