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
