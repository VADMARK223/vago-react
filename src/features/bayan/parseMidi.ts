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
