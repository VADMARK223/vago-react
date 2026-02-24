import * as Tone from 'tone';
import { useEffect, useRef } from 'react';
import type { MidiNote } from '@/features/bayan/bayan.store';

export const useMidiAudioPlayer = () => {
  const synthRef = useRef<Tone.PolySynth | null>(null);

  useEffect(() => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synthRef.current = synth;

    return () => {
      synth.dispose();
    };
  }, []);

  const playNotes = async (notes: MidiNote[]) => {
    if (!synthRef.current) {
      return;
    }

    await Tone.start(); // обязательно — браузер требует gesture

    const now = Tone.now();

    for (let i = 0; i < notes.length; i++) {
      const n = notes[i];

      const time = now + n.startSec;
      const duration = n.durationSec;

      const frequency = Tone.Frequency(n.pitch, 'midi').toNote();

      synthRef.current.triggerAttackRelease(frequency, duration, time, n.velocity);
    }
  };

  return { playNotes };
};
