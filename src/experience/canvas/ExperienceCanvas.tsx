import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { useExperienceStore } from "../../store/useExperienceStore";
import { AudioBed } from "../audio/AudioBed";
import { WaitingRoom } from "../scenes/WaitingRoom/WaitingRoom";

export const ExperienceCanvas = () => {
  const sceneConfig = useExperienceStore((state) => state.sceneConfig);
  const setRoute = useExperienceStore((state) => state.setRoute);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const [showHint, setShowHint] = useState(true);

  if (!sceneConfig) return null;

  return (
    <section className="scene-shell">
      <div className="scene-overlay">
        <button className="text-button" onClick={() => setRoute("results")}>
          Leave room
        </button>
        {showHint && <span>Click once, then move with WASD or arrows.</span>}
      </div>
      <Canvas camera={{ position: [0, 1.7, 7], fov: 62 }} shadows>
        <Suspense fallback={null}>
          <WaitingRoom
            config={sceneConfig}
            onFirstMove={() => setShowHint(false)}
            onExitReached={() => setRoute("results")}
          />
        </Suspense>
      </Canvas>
      <AudioBed config={sceneConfig} reducedMotion={reducedMotion} />
    </section>
  );
};
