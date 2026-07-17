import { useExperienceStore } from "../../store/useExperienceStore";

export const IntroNotice = () => {
  const setRoute = useExperienceStore((state) => state.setRoute);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const toggleReducedMotion = useExperienceStore((state) => state.toggleReducedMotion);

  return (
    <section className="screen notice-screen">
      <div className="quiet-panel">
        <p className="kicker">Before the room forms</p>
        <h2>This is an artistic interpretation of your answers, not a psychological assessment.</h2>
        <p>
          Your responses stay in this browser. You can skip any question, continue without personal
          text, leave the room, and restart at any time.
        </p>
        <label className="toggle-line">
          <input type="checkbox" checked={reducedMotion} onChange={toggleReducedMotion} />
          Reduced motion
        </label>
        <button className="primary-button" onClick={() => setRoute("questionnaire")}>
          Continue
        </button>
      </div>
    </section>
  );
};
