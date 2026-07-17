import { Environment, Text } from "@react-three/drei";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useMemo } from "react";
import * as THREE from "three";
import { useExperienceStore } from "../../../store/useExperienceStore";
import type { SceneConfig } from "../../../types/sceneConfig";
import { useKeyboardMovement } from "../../interactions/useKeyboardMovement";
import { Chair } from "./Chair";
import { ExitDoor } from "./ExitDoor";
import { QueueDisplay } from "./QueueDisplay";

type WaitingRoomProps = {
  config: SceneConfig;
  onFirstMove: () => void;
  onExitReached: () => void;
};

export const WaitingRoom = ({ config, onFirstMove, onExitReached }: WaitingRoomProps) => {
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const wallDepth = Math.max(config.corridorLength, config.exitDistance + 5);
  useKeyboardMovement({
    enabled: true,
    speed: reducedMotion ? 2.2 : 3.6,
    zBounds: [-config.exitDistance - 0.8, 7],
    exitZ: -config.exitDistance + 0.8,
    onMove: onFirstMove,
    onExitReached,
  });

  const chairPositions = useMemo(() => {
    const positions: Array<[number, number, number, number]> = [];
    for (let row = 0; row < 4; row += 1) {
      for (let seat = 0; seat < 6; seat += 1) {
        const centeredSeat = seat - 2.5;
        const imperfection = row === 2 && seat === 4 ? config.imperfection : 0;
        positions.push([
          centeredSeat * (1.22 + config.symmetry * 0.04) + imperfection,
          0,
          1.5 - row * (1.46 + config.symmetry * 0.08),
          Math.PI + imperfection * 0.22,
        ]);
      }
    }
    return positions;
  }, [config.imperfection, config.symmetry]);
  const wallColor = config.warmth > 0.42 ? "#d5d3c2" : "#c9ccc2";
  const lightColor = config.exitWarmth > 0.55 ? "#efe2b2" : "#e3e6d4";

  return (
    <>
      <color attach="background" args={[wallColor]} />
      <fog attach="fog" args={[wallColor, 7, 9 + wallDepth * (1 - config.fogDensity)]} />
      <ambientLight intensity={0.18 + config.lightIntensity * 0.2} />
      <directionalLight position={[0, 6, 3]} intensity={0.4} castShadow />
      <Environment preset="warehouse" />

      <mesh receiveShadow position={[0, -0.02, -wallDepth / 2]}>
        <boxGeometry args={[11, 0.08, wallDepth + 12]} />
        <meshStandardMaterial color="#b7b9ae" roughness={0.94} />
      </mesh>
      <mesh receiveShadow position={[0, 3.8, -wallDepth / 2]}>
        <boxGeometry args={[11, 0.16, wallDepth + 12]} />
        <meshStandardMaterial color={wallColor} roughness={0.86} />
      </mesh>
      {[-5.5, 5.5].map((x) => (
        <mesh key={x} receiveShadow position={[x, 1.9, -wallDepth / 2]}>
          <boxGeometry args={[0.18, 3.8, wallDepth + 12]} />
          <meshStandardMaterial color="#c2c6ba" roughness={0.92} />
        </mesh>
      ))}

      {Array.from({ length: Math.max(4, config.roomRepetition + 4) }).map((_, index) => (
        <group key={index} position={[0, 3.72, 3 - index * 5.2]}>
          <mesh>
            <boxGeometry args={[6.2, 0.08, 0.42]} />
            <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={config.lightIntensity * (reducedMotion ? 0.36 : 0.56)} />
          </mesh>
          <pointLight
            color={lightColor}
            intensity={config.lightIntensity * 1.1}
            distance={8}
            position={[0, -0.25, 0]}
          />
        </group>
      ))}

      {chairPositions.map(([x, y, z, rotation], index) => (
        <Chair
          key={`${x}-${z}-${index}`}
          position={[x, y, z]}
          baseRotation={rotation}
          judgement={reducedMotion ? config.chairRotationIntensity * 0.35 : config.chairRotationIntensity}
          reactionDelay={config.chairReactionDelay}
        />
      ))}

      <QueueDisplay message={config.dominantMessage} repetition={config.roomRepetition} />
      <ExitDoor
        distance={config.exitDistance}
        brightness={config.exitBrightness}
        avoidance={config.exitDistance / 36}
        warmth={config.exitWarmth}
      />

      <TextWall position={[-5.38, 1.7, -3.8]} rotation={[0, Math.PI / 2, 0]} text="TAKE A NUMBER" />
      <TextWall position={[5.38, 1.7, -11]} rotation={[0, -Math.PI / 2, 0]} text="WAIT WHERE YOU ARE" />

      <EffectComposer enabled={!reducedMotion}>
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.08} />
        <Vignette offset={0.18} darkness={0.42} />
      </EffectComposer>
    </>
  );
};

type TextWallProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  text: string;
};

const TextWall = ({ position, rotation, text }: TextWallProps) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <planeGeometry args={[2.4, 0.55]} />
      <meshStandardMaterial color="#bfc2b5" side={THREE.DoubleSide} />
    </mesh>
    <Text
      position={[0, 0.01, 0.02]}
      fontSize={0.15}
      letterSpacing={0.05}
      color="#6c7168"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  </group>
);
