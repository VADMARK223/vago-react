import { useEffect, useRef } from 'react';
import type { MidiNote } from '@/features/bayan/bayan.store';

type ToneModule = typeof import('tone');

export const useMidiAudioPlayer = () => {
  const toneRef = useRef<ToneModule | null>(null);
  const synthRef = useRef<InstanceType<ToneModule['PolySynth']> | null>(null);

  useEffect(() => {
    return () => {
      synthRef.current?.dispose?.();
      synthRef.current = null;
    };
  }, []);

  const ensureTone = async () => {
    if (!toneRef.current) {
      toneRef.current = await import('tone');
    }
    const Tone = toneRef.current!;
    await Tone.start(); // после gesture
    if (!synthRef.current) {
      synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
    }
    return Tone;
  };

  const playNotes = async (notes: MidiNote[]) => {
    const Tone = await ensureTone();
    const synth = synthRef.current;
    const now = Tone.now();

    for (const n of notes) {
      const time = now + n.startSec;
      const duration = n.durationSec;
      const note = Tone.Frequency(n.pitch, 'midi').toNote();
      synth?.triggerAttackRelease(note, duration, time, n.velocity);
    }
  };

  return { playNotes };
};
