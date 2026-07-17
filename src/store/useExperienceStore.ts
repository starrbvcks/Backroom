import { create } from "zustand";
import type { ExperienceRoute } from "../app/routes";
import type { EmotionalProfile } from "../types/emotionalProfile";
import type { SceneConfig } from "../types/sceneConfig";
import { questions } from "../data/questions";
import { scoreAnswers, type QuestionnaireAnswers } from "../systems/emotionalScoring";
import { generateSceneConfig } from "../systems/sceneConfigGenerator";

type ExperienceState = {
  route: ExperienceRoute;
  answers: QuestionnaireAnswers;
  profile: EmotionalProfile | null;
  sceneConfig: SceneConfig | null;
  reducedMotion: boolean;
  setRoute: (route: ExperienceRoute) => void;
  answerQuestion: (questionId: string, optionId: string | null) => void;
  completeQuestionnaire: () => void;
  toggleReducedMotion: () => void;
  restart: () => void;
};

const initialAnswers = (): QuestionnaireAnswers =>
  Object.fromEntries(questions.map((question) => [question.id, null]));

export const useExperienceStore = create<ExperienceState>((set, get) => ({
  route: "landing",
  answers: initialAnswers(),
  profile: null,
  sceneConfig: null,
  reducedMotion: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
  setRoute: (route) => set({ route }),
  answerQuestion: (questionId, optionId) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: optionId } })),
  completeQuestionnaire: () => {
    const profile = scoreAnswers(get().answers);
    set({ profile, sceneConfig: generateSceneConfig(profile), route: "forming" });
  },
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
  restart: () => set({ route: "landing", answers: initialAnswers(), profile: null, sceneConfig: null }),
}));
