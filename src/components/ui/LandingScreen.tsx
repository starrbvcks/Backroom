import { useExperienceStore } from "../../store/useExperienceStore";

export const LandingScreen = () => {
  const setRoute = useExperienceStore((state) => state.setRoute);

  return (
    <section className="screen landing-screen">
      <div className="quiet-panel">
        <p className="kicker">Interactive visualisation</p>
        <h1>UNSAID ROOMS</h1>
        <p>
          A quiet room assembled from indirect answers. No account, no server, no diagnosis.
        </p>
        <button className="primary-button" onClick={() => setRoute("intro")}>
          Enter
        </button>
      </div>
    </section>
  );
};
