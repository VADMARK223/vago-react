import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Midi } from '@tonejs/midi';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const SOLFEGE = ['До', 'До#', 'Ре', 'Ре#', 'Ми', 'Фа', 'Фа#', 'Соль', 'Соль#', 'Ля', 'Ля#', 'Си'];

export type MidiInfo = {
  name: string;
  size: number;
};

export type MidiNote = {
  startSec: number; // Время начала ноты в секундах от начала трека.
  endSec: number; // Время окончания ноты в секундах.
  durationSec: number; // Длительность ноты в секундах.
  pitch: number; // MIDI номер ноты (высота). 60 = C4
  note: string; // Название ноты
  velocity: number; // Сила нажатия (громкость). 0..1
  trackIndex: number; // Индекс трека в MIDI файле (0, 1, 2...).
  channel?: number; // MIDI-канал (0–15).
};

export type ParsedMidi = {
  notes: MidiNote[];
  durationSec: number;
  tracksCount: number;
};

export type MidiDTO = {
  fileName?: string;
  arrayBuffer: ArrayBuffer;
};

type LoadedMidi = {
  info: MidiInfo;
  base64: string;
};

type BayanState = {
  midi: LoadedMidi | null;
  parsed: ParsedMidi | null;
  setMidiLoaded: (dto: MidiDTO) => void;
  reset: () => void;
};

export const useBayanStore = create<BayanState>()(
  persist(
    (set) => ({
      midi: null,
      parsed: null,

      setMidiLoaded: ({ arrayBuffer, fileName }) => {
        const name = fileName ?? 'local_store';

        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

        const parsed = parseMidi(arrayBuffer);

        set({
          midi: {
            info: { name, size: arrayBuffer.byteLength },
            base64,
          },
          parsed,
        });
      },

      reset: () => set({ midi: null, parsed: null }),
    }),
    {
      name: 'bayan-storage',
      partialize: (state) => ({
        midi: state.midi, // parsed НЕ сохраняем
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Rehydrate error', error);
          return;
        }
        if (state?.midi?.base64) {
          const binary = atob(state.midi.base64);
          const buffer = new Uint8Array([...binary].map((c) => c.charCodeAt(0))).buffer;

          state.parsed = parseMidi(buffer);
        }
      },
    },
  ),
);

function midiToNote(midi: number) {
  const index = midi % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTES[index]}${octave} (${SOLFEGE[index]})`;
}

function parseMidi(arrayBuffer: ArrayBuffer): ParsedMidi {
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
}
