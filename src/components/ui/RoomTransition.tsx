import { useEffect } from "react";
import { useExperienceStore } from "../../store/useExperienceStore";

type RoomTransitionProps = {
  loading?: boolean;
};

export const RoomTransition = ({ loading = false }: RoomTransitionProps) => {
  const setRoute = useExperienceStore((state) => state.setRoute);
  const sceneConfig = useExperienceStore((state) => state.sceneConfig);

  useEffect(() => {
    if (loading) return undefined;
    const timeout = window.setTimeout(() => setRoute("scene"), 1250);
    return () => window.clearTimeout(timeout);
  }, [loading, setRoute]);

  return (
    <section className="screen room-transition" aria-live="polite">
      <div className="transition-copy">
        <p className="kicker">The room is taking shape</p>
        <h2>{sceneConfig?.dominantMessage ?? "PLEASE WAIT"}</h2>
        <p>{loading ? "Opening the far door." : "The lights arrive before the walls do."}</p>
      </div>
    </section>
  );
};
