import { lazy, Suspense } from "react";
import { LandingScreen } from "../components/ui/LandingScreen";
import { IntroNotice } from "../components/ui/IntroNotice";
import { Questionnaire } from "../components/questionnaire/Questionnaire";
import { ResultsScreen } from "../components/results/ResultsScreen";
import { RoomTransition } from "../components/ui/RoomTransition";
import { useExperienceStore } from "../store/useExperienceStore";

const ExperienceCanvas = lazy(() =>
  import("../experience/canvas/ExperienceCanvas").then((module) => ({ default: module.ExperienceCanvas })),
);

export const App = () => {
  const route = useExperienceStore((state) => state.route);

  return (
    <main className="app-shell">
      {route === "landing" && <LandingScreen />}
      {route === "intro" && <IntroNotice />}
      {route === "questionnaire" && <Questionnaire />}
      {route === "forming" && <RoomTransition />}
      {route === "scene" && (
        <Suspense fallback={<RoomTransition loading />}>
          <ExperienceCanvas />
        </Suspense>
      )}
      {route === "results" && <ResultsScreen />}
    </main>
  );
};
