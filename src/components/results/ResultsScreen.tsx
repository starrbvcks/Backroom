import { useExperienceStore } from "../../store/useExperienceStore";
import type { EmotionalProfile } from "../../types/emotionalProfile";

const profileKeys: Array<keyof EmotionalProfile> = [
  "avoidance",
  "overthinking",
  "fearOfJudgement",
  "loneliness",
  "needForControl",
  "hope",
];

export const ResultsScreen = () => {
  const profile = useExperienceStore((state) => state.profile);
  const sceneConfig = useExperienceStore((state) => state.sceneConfig);
  const restart = useExperienceStore((state) => state.restart);

  if (!profile || !sceneConfig) return null;

  return (
    <section className="screen results-screen">
      <div className="quiet-panel results-panel">
        <p className="kicker">Mental portrait</p>
        <h2>{sceneConfig.roomTitle}</h2>
        <p>{sceneConfig.portrait}</p>
        <ul className="portrait-list">
          <li>The far door held {sceneConfig.exitBrightness > 0.8 ? "a readable warmth" : "a low, uncertain light"}.</li>
          <li>The room repeated itself {sceneConfig.roomRepetition > 3 ? "in several quiet echoes" : "only where it needed to"}.</li>
          <li>The chairs {sceneConfig.chairRotationIntensity > 0.45 ? "kept finding your position" : "mostly stayed with themselves"}.</li>
        </ul>
        <details className="technical-profile">
          <summary>Technical profile</summary>
          <div className="profile-bars">
            {profileKeys.map((key) => (
              <div className="bar-row" key={key}>
                <span>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.round(profile[key] * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </details>
        <p className="notice-line">This experience is an artistic interpretation of your answers, not a psychological assessment.</p>
        <button className="primary-button" onClick={restart}>
          Restart
        </button>
      </div>
    </section>
  );
};
