import { useEffect } from "react";
import type { SceneConfig } from "../../types/sceneConfig";

type AudioBedProps = {
  config: SceneConfig;
  reducedMotion: boolean;
};

export const AudioBed = ({ config, reducedMotion }: AudioBedProps) => {
  useEffect(() => {
    let context: AudioContext | null = null;
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    let master: GainNode | null = null;

    const makeLayer = (frequency: number, type: OscillatorType, volume: number) => {
      if (!context || !master) return;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.value = 0;
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start();
      gain.gain.linearRampToValueAtTime(volume, context.currentTime + 1.2);
      oscillators.push(oscillator);
      gains.push(gain);
    };

    const start = () => {
      context = new AudioContext();
      master = context.createGain();
      master.gain.value = reducedMotion ? 0.42 : 0.62;
      master.connect(context.destination);
      makeLayer(58, "sawtooth", config.humIntensity * 0.35);
      makeLayer(111, "sine", config.ambientNoiseIntensity * 0.22);
      makeLayer(174, "triangle", config.voiceLayerIntensity * (reducedMotion ? 0.18 : 0.28));
      window.removeEventListener("pointerdown", start);
    };

    window.addEventListener("pointerdown", start, { once: true });

    return () => {
      window.removeEventListener("pointerdown", start);
      if (context) {
        gains.forEach((gain) => gain.gain.linearRampToValueAtTime(0, context!.currentTime + 0.25));
        window.setTimeout(() => {
          oscillators.forEach((oscillator) => oscillator.stop());
          context?.close();
        }, 280);
      }
    };
  }, [config.ambientNoiseIntensity, config.humIntensity, config.voiceLayerIntensity, reducedMotion]);

  return null;
};
