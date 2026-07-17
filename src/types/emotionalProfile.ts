export type EmotionalProfile = {
  avoidance: number;
  overthinking: number;
  fearOfJudgement: number;
  loneliness: number;
  needForControl: number;
  hope: number;
};

export const emptyEmotionalProfile: EmotionalProfile = {
  avoidance: 0,
  overthinking: 0,
  fearOfJudgement: 0,
  loneliness: 0,
  needForControl: 0,
  hope: 0,
};

export type EmotionalDimension = keyof EmotionalProfile;
