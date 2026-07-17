import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type ChairProps = {
  position: [number, number, number];
  baseRotation: number;
  judgement: number;
  reactionDelay: number;
};

export const Chair = ({ position, baseRotation, judgement, reactionDelay }: ChairProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, camera }) => {
    if (!groupRef.current) return;
    const distance = groupRef.current.position.distanceTo(camera.position);
    const rowDelay = THREE.MathUtils.clamp((Math.abs(position[2]) * reactionDelay) / 8, 0, 0.8);
    const attention = Math.max(0, THREE.MathUtils.clamp(1 - distance / 12, 0, 1) - rowDelay) * judgement;
    const turn = Math.sin(clock.elapsedTime * 0.7 + position[2]) * 0.08 + attention * Math.PI * 0.34;
    groupRef.current.rotation.y = baseRotation + turn;
  });

  return (
    <group ref={groupRef} position={position} rotation-y={baseRotation}>
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[0.82, 0.12, 0.76]} />
        <meshStandardMaterial color="#60645d" roughness={0.82} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.08, 0.32]} rotation-x={-0.08}>
        <boxGeometry args={[0.82, 0.9, 0.12]} />
        <meshStandardMaterial color="#555951" roughness={0.86} />
      </mesh>
      {[-0.32, 0.32].map((x) =>
        [-0.26, 0.26].map((z) => (
          <mesh key={`${x}-${z}`} castShadow position={[x, 0.25, z]}>
            <boxGeometry args={[0.07, 0.5, 0.07]} />
            <meshStandardMaterial color="#343833" roughness={0.9} />
          </mesh>
        )),
      )}
    </group>
  );
};
