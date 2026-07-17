import type { EmotionalProfile } from "../types/emotionalProfile";
import type { SceneConfig } from "../types/sceneConfig";

const lerp = (min: number, max: number, value: number) => min + (max - min) * value;

export const generateSceneConfig = (profile: EmotionalProfile): SceneConfig => {
  const dominant = Object.entries(profile).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "hope";

  const messages: Record<string, string> = {
    avoidance: "PLEASE WAIT ELSEWHERE",
    overthinking: "NOW SERVING: THE SAME THOUGHT",
    fearOfJudgement: "WINDOW 4 IS OBSERVING",
    loneliness: "NO OTHER APPOINTMENTS TODAY",
    needForControl: "QUEUE ORDER RESTORED",
    hope: "EXIT REMAINS OPEN",
  };
  const titles: Record<string, string> = {
    avoidance: "The Far Appointment",
    overthinking: "The Repeating Number",
    fearOfJudgement: "The Room That Notices",
    loneliness: "The Empty Shift",
    needForControl: "The Ordered Delay",
    hope: "The Door Left On",
  };
  const portraits: Record<string, string> = {
    avoidance: "The exit stayed visible, but the room asked for distance first.",
    overthinking: "Small details repeated until the waiting area felt rehearsed.",
    fearOfJudgement: "The furniture did not move much. It simply learned where you were.",
    loneliness: "The room widened around you, quiet enough to make the lights feel far away.",
    needForControl: "The room arranged itself with care, then allowed one thing to sit slightly wrong.",
    hope: "A warmer edge remained at the end of the room, not cheerful, just possible.",
  };

  return {
    corridorLength: Math.round(lerp(12, 38, profile.avoidance)),
    roomRepetition: Math.round(lerp(1, 5, profile.overthinking)),
    fogDensity: lerp(0.014, 0.082, profile.loneliness),
    lightIntensity: lerp(0.42, 1.08, profile.hope),
    lightFlicker: lerp(0.02, 0.18, Math.max(profile.overthinking, 1 - profile.hope)),
    warmth: lerp(0.15, 0.72, profile.hope) - lerp(0, 0.22, profile.loneliness),
    symmetry: lerp(0.25, 1, profile.needForControl),
    imperfection: lerp(0.04, 0.42, profile.needForControl),
    chairRotationIntensity: lerp(0.04, 0.82, profile.fearOfJudgement),
    chairReactionDelay: lerp(0.9, 0.2, profile.fearOfJudgement),
    exitDistance: lerp(13, 32, profile.avoidance),
    exitBrightness: lerp(0.24, 1.35, profile.hope),
    exitWarmth: lerp(0.2, 1, profile.hope),
    ambientNoiseIntensity: lerp(0.025, 0.16, Math.max(profile.loneliness, profile.overthinking)),
    voiceLayerIntensity: lerp(0.01, 0.09, Math.max(profile.loneliness, profile.fearOfJudgement)),
    humIntensity: lerp(0.03, 0.14, Math.max(profile.overthinking, profile.needForControl)),
    dominantMessage: messages[dominant],
    roomTitle: titles[dominant],
    portrait: portraits[dominant],
  };
};
