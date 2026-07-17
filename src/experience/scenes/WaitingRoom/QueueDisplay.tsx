import { Text } from "@react-three/drei";

type QueueDisplayProps = {
  message: string;
  repetition: number;
};

export const QueueDisplay = ({ message, repetition }: QueueDisplayProps) => (
  <group position={[0, 3.05, -7.8]}>
    <mesh>
      <boxGeometry args={[4.4, 0.72, 0.12]} />
      <meshStandardMaterial color="#101411" emissive="#1e3b2f" emissiveIntensity={0.45} />
    </mesh>
    <Text
      position={[0, 0.01, 0.08]}
      fontSize={0.2}
      letterSpacing={0.04}
      color="#a8d8b8"
      anchorX="center"
      anchorY="middle"
    >
      {message}
    </Text>
    {Array.from({ length: Math.max(0, repetition - 1) }).map((_, index) => (
      <Text
        key={index}
        position={[0, -0.64 - index * 0.26, 0.08]}
        fontSize={0.09}
        letterSpacing={0.04}
        color="#6e9178"
        anchorX="center"
        anchorY="middle"
      >
        {`NOW SERVING ${String(index + 1).padStart(2, "0")}`}
      </Text>
    ))}
  </group>
);
