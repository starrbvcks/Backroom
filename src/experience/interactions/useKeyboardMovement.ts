import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const keys = new Set<string>();
const direction = new THREE.Vector3();
const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const targetVelocity = new THREE.Vector3();

type MovementOptions = {
  enabled: boolean;
  speed?: number;
  zBounds: [number, number];
  onMove?: () => void;
  onExitReached?: () => void;
  exitZ: number;
};

export const useKeyboardMovement = ({
  enabled,
  speed = 4,
  zBounds,
  onMove,
  onExitReached,
  exitZ,
}: MovementOptions) => {
  const { camera } = useThree();
  const yaw = useRef(0);
  const pitch = useRef(0);
  const velocity = useRef(new THREE.Vector3());
  const hasMoved = useRef(false);
  const exitTriggered = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const onKeyDown = (event: KeyboardEvent) => keys.add(event.key.toLowerCase());
    const onKeyUp = (event: KeyboardEvent) => keys.delete(event.key.toLowerCase());
    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== document.body) return;
      yaw.current -= event.movementX * 0.002;
      pitch.current = THREE.MathUtils.clamp(pitch.current - event.movementY * 0.002, -0.85, 0.85);
    };
    const requestPointerLock = () => {
      if (document.pointerLockElement || document.activeElement instanceof HTMLButtonElement) return;
      document.body.requestPointerLock();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", requestPointerLock);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", requestPointerLock);
      keys.clear();
    };
  }, [enabled]);

  useFrame((_, delta) => {
    if (!enabled) return;

    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");
    direction.set(0, 0, 0);
    if (keys.has("w") || keys.has("arrowup")) direction.z -= 1;
    if (keys.has("s") || keys.has("arrowdown")) direction.z += 1;
    if (keys.has("a") || keys.has("arrowleft")) direction.x -= 1;
    if (keys.has("d") || keys.has("arrowright")) direction.x += 1;
    direction.normalize();
    if (direction.lengthSq() > 0 && !hasMoved.current) {
      hasMoved.current = true;
      onMove?.();
    }

    forward.set(0, 0, -1).applyEuler(camera.rotation);
    forward.y = 0;
    forward.normalize();
    right.set(1, 0, 0).applyEuler(camera.rotation);
    right.y = 0;
    right.normalize();

    targetVelocity.set(direction.x * speed, 0, direction.z * speed);
    velocity.current.lerp(targetVelocity, 1 - Math.exp(-delta * 9));

    camera.position.addScaledVector(forward, velocity.current.z * delta);
    camera.position.addScaledVector(right, velocity.current.x * delta);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -4.8, 4.8);
    camera.position.y = 1.7;
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, zBounds[0], zBounds[1]);

    if (!exitTriggered.current && camera.position.z <= exitZ) {
      exitTriggered.current = true;
      onExitReached?.();
    }
  });
};
