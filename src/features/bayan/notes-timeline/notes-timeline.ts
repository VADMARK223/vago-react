export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;

// 0..11 -> латинская буква (без учёта диезов — для позиции на стане это ок)
const PITCH_CLASS_TO_LETTER: Record<number, (typeof LETTERS)[number]> = {
  0: 'C',
  1: 'C', // C#
  2: 'D',
  3: 'D', // D#
  4: 'E',
  5: 'F',
  6: 'F', // F#
  7: 'G',
  8: 'G', // G#
  9: 'A',
  10: 'A', // A#
  11: 'B',
};

const LETTER_TO_DEGREE: Record<(typeof LETTERS)[number], number> = {
  C: 0,
  D: 1,
  E: 2,
  F: 3,
  G: 4,
  A: 5,
  B: 6,
};

// как ты уже делал
const midiToOctave = (midi: number) => Math.floor(midi / 12) - 1;

// диатонический номер = “счётчик букв” (каждая октава +7)
const midiToDiatonicNumber = (midi: number) => {
  const octave = midiToOctave(midi);
  const letter = PITCH_CLASS_TO_LETTER[midi % 12];
  const degree = LETTER_TO_DEGREE[letter];
  return octave * 7 + degree;
};

// В скрипичном ключе нижняя линия = E4 (midi 64)
const DIATONIC_E4 = midiToDiatonicNumber(64);

// step: 0 = нижняя линия (E4), 1 = пробел над ней (F4), 2 = линия (G4)...
export const midiToTrebleStaffStep = (midi: number) => {
  const dn = midiToDiatonicNumber(midi);
  return dn - DIATONIC_E4;
};

// y: центр головки на своём месте
export const staffStepToY = (step: number, staffBottomLineY: number, lineGap: number) => {
  const halfGap = lineGap / 2; // линия/пробел
  return staffBottomLineY - step * halfGap;
};
