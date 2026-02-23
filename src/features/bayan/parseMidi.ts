import { Midi } from '@tonejs/midi';
import type { MidiNote, ParsedMidi } from '@/features/bayan/midi.types';

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
