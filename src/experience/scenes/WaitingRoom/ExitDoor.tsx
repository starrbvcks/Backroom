import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type ExitDoorProps = {
  distance: number;
  brightness: number;
  avoidance: number;
  warmth: number;
};

export const ExitDoor = ({ distance, brightness, avoidance, warmth }: ExitDoorProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (!groupRef.current) return;
    const approach = THREE.MathUtils.clamp((camera.position.z + distance - 4) / 8, 0, 1);
    groupRef.current.position.z = -distance - approach * avoidance * 2.2;
  });
  const color = warmth > 0.55 ? "#d8c68f" : "#cfd2bb";
  const emissive = warmth > 0.55 ? "#d9b35f" : "#b9c5a8";

  return (
    <group ref={groupRef} position={[0, 1.45, -distance]}>
      <mesh>
        <boxGeometry args={[1.55, 2.65, 0.12]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={brightness}
          roughness={0.5}
        />
      </mesh>
      <pointLight color={emissive} intensity={brightness * 2.2} distance={12} />
    </group>
  );
};
