import type { EmotionalDimension } from "../types/emotionalProfile";

export type AnswerOption = {
  id: string;
  label: string;
  affects: EmotionalDimension[];
  weights: Partial<Record<EmotionalDimension, number>>;
};

export type Question = {
  id: string;
  prompt: string;
  options: AnswerOption[];
};

export const questions: Question[] = [
  {
    id: "bothering-response",
    prompt: "When something is bothering you, what do you usually do?",
    options: [
      { id: "leave-it", label: "I put it somewhere I can pass later.", affects: ["avoidance", "loneliness"], weights: { avoidance: 0.8, loneliness: 0.28 } },
      { id: "loop-it", label: "I keep turning it until an edge appears.", affects: ["overthinking", "needForControl"], weights: { overthinking: 0.85, needForControl: 0.28 } },
      { id: "tell-someone", label: "I let one person know where it is.", affects: ["hope", "loneliness"], weights: { hope: 0.58, loneliness: -0.18 } },
    ],
  },
  {
    id: "watched-forgotten",
    prompt: "Which feels more uncomfortable?",
    options: [
      { id: "watched", label: "A room that notices too quickly.", affects: ["fearOfJudgement", "avoidance"], weights: { fearOfJudgement: 0.9, avoidance: 0.18 } },
      { id: "forgotten", label: "A room that never calls your number.", affects: ["loneliness", "hope"], weights: { loneliness: 0.82, hope: -0.16 } },
      { id: "both", label: "A room that cannot decide what you are.", affects: ["fearOfJudgement", "loneliness"], weights: { fearOfJudgement: 0.45, loneliness: 0.45 } },
    ],
  },
  {
    id: "decision",
    prompt: "When you cannot make a decision, what happens next?",
    options: [
      { id: "organize", label: "I make the choices stand in order.", affects: ["needForControl", "overthinking"], weights: { needForControl: 0.85, overthinking: 0.34 } },
      { id: "delay", label: "I let the pressure walk ahead of me.", affects: ["avoidance", "hope"], weights: { avoidance: 0.68, hope: -0.08 } },
      { id: "small-step", label: "I choose the door with the least light.", affects: ["hope", "needForControl"], weights: { hope: 0.48, needForControl: 0.22 } },
    ],
  },
  {
    id: "current-space",
    prompt: "Which space feels closer to your current state?",
    options: [
      { id: "empty-hall", label: "A hallway after everyone has gone.", affects: ["loneliness", "avoidance"], weights: { loneliness: 0.62, avoidance: 0.34 } },
      { id: "waiting-area", label: "A number board that keeps correcting itself.", affects: ["overthinking", "fearOfJudgement"], weights: { overthinking: 0.66, fearOfJudgement: 0.28 } },
      { id: "lit-door", label: "A door whose light has not given up.", affects: ["hope"], weights: { hope: 0.72 } },
    ],
  },
  {
    id: "exit-visible",
    prompt: "When you imagine an exit, how visible is it?",
    options: [
      { id: "barely", label: "A pale rectangle at the end.", affects: ["hope", "avoidance", "loneliness"], weights: { hope: -0.42, avoidance: 0.38, loneliness: 0.24 } },
      { id: "moving", label: "Visible, but never quite where it was.", affects: ["avoidance", "overthinking"], weights: { avoidance: 0.75, overthinking: 0.24 } },
      { id: "steady", label: "Still there when I look again.", affects: ["hope", "needForControl"], weights: { hope: 0.82, needForControl: 0.14 } },
    ],
  },
  {
    id: "silence",
    prompt: "What does silence usually do in a room with you?",
    options: [
      { id: "widens", label: "It makes the walls feel farther away.", affects: ["loneliness"], weights: { loneliness: 0.86 } },
      { id: "listens", label: "It starts listening back.", affects: ["fearOfJudgement", "overthinking"], weights: { fearOfJudgement: 0.7, overthinking: 0.3 } },
      { id: "softens", label: "It leaves one clear breath.", affects: ["hope", "avoidance"], weights: { hope: 0.44, avoidance: -0.14 } },
    ],
  },
  {
    id: "pattern",
    prompt: "What kind of pattern calms you?",
    options: [
      { id: "symmetry", label: "Rows that agree with each other.", affects: ["needForControl"], weights: { needForControl: 0.9 } },
      { id: "variation", label: "One chair slightly out of place.", affects: ["hope", "needForControl"], weights: { hope: 0.38, needForControl: -0.18 } },
      { id: "none", label: "No pattern that stays long enough.", affects: ["loneliness", "overthinking"], weights: { loneliness: 0.25, overthinking: 0.35 } },
    ],
  },
];
