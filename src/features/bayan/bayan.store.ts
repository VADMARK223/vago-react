import { create } from 'zustand';
import { parseMidi } from '@/features/bayan/parse-midi';
import { persist } from 'zustand/middleware';

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
      onRehydrateStorage: () => (state) => {
        if (state?.midi?.base64) {
          const binary = atob(state.midi.base64);
          const buffer = new Uint8Array([...binary].map((c) => c.charCodeAt(0))).buffer;

          state.parsed = parseMidi(buffer);
        }
      },
    },
  ),
);
