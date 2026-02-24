import { Midi } from '@tonejs/midi';
import type { MidiNote, ParsedMidi } from '@/features/bayan/bayan.store';

export const parseMidi = (arrayBuffer: ArrayBuffer): ParsedMidi => {
  const midi = new Midi(arrayBuffer);

  const notes = midi.tracks.flatMap((t, trackIndex) =>
    t.notes.map(
      (n): MidiNote => ({
        startSec: n.time,
        durationSec: n.duration,
        endSec: n.time + n.duration,
        pitch: n.midi,
        note: midiToNote(n.midi),
        velocity: n.velocity,
        trackIndex,
        channel: t.channel,
      }),
    ),
  );

  notes.sort((a, b) => a.startSec - b.startSec || a.pitch - b.pitch);

  return {
    notes,
    durationSec: midi.duration,
    tracksCount: midi.tracks.length,
  };
};

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const SOLFEGE = ['До', 'До#', 'Ре', 'Ре#', 'Ми', 'Фа', 'Фа#', 'Соль', 'Соль#', 'Ля', 'Ля#', 'Си'];

const midiToNote = (midi: number) => {
  const index = midi % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTES[index]}${octave} (${SOLFEGE[index]})`;
};

const LOCAL_STORAGE_KEY = 'last-midi';

export const loadFromStorage = (): ArrayBuffer | null => {
  const base64 = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!base64) {
    return null;
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
};

export const saveToStorage = (arrayBuffer: ArrayBuffer) => {
  const bytes = new Uint8Array(arrayBuffer);
  const binary = Array.from(bytes)
    .map((b) => String.fromCharCode(b))
    .join('');

  const base64 = btoa(binary);
  localStorage.setItem(LOCAL_STORAGE_KEY, base64);
};

export const resetStore = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
