import { create } from 'zustand';
import { parseMidi } from '@/features/bayan/parse-midi';

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
  parsed: ParsedMidi;
};

type BayanState = {
  midi: LoadedMidi | null;
  setMidiLoaded: (dto: MidiDTO) => void;
  reset: () => void;
};

export const useBayanStore = create<BayanState>((set) => ({
  midi: null,
  setMidiLoaded: (dto: MidiDTO) => {
    const arrayBuffer = dto.arrayBuffer;
    const name = dto.fileName ?? 'local_store';
    const parsed = parseMidi(arrayBuffer);

    set({
      midi: {
        info: { name, size: arrayBuffer.byteLength },
        parsed,
      },
    });
  },
  reset: () => set({ midi: null }),
}));
