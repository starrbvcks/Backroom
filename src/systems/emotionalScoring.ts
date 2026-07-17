import { questions, type AnswerOption } from "../data/questions";
import { emptyEmotionalProfile, type EmotionalProfile } from "../types/emotionalProfile";

export type QuestionnaireAnswers = Record<string, string | null>;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const findOption = (questionId: string, optionId: string): AnswerOption | undefined =>
  questions.find((question) => question.id === questionId)?.options.find((option) => option.id === optionId);

export const scoreAnswers = (answers: QuestionnaireAnswers): EmotionalProfile => {
  const totals = { ...emptyEmotionalProfile };
  const counts = { ...emptyEmotionalProfile };

  Object.entries(answers).forEach(([questionId, optionId]) => {
    if (!optionId) return;
    const option = findOption(questionId, optionId);
    if (!option) return;

    Object.entries(option.weights).forEach(([dimension, weight]) => {
      const key = dimension as keyof EmotionalProfile;
      totals[key] += weight ?? 0;
      counts[key] += 1;
    });
  });

  const scored = { ...emptyEmotionalProfile };
  (Object.keys(scored) as Array<keyof EmotionalProfile>).forEach((dimension) => {
    const average = counts[dimension] === 0 ? 0.35 : totals[dimension] / counts[dimension];
    scored[dimension] = clamp01((average + 0.25) / 1.25);
  });

  return scored;
};
