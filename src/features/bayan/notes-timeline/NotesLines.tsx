import type { MidiNote } from '@/features/bayan/midi.types';

const noteH = 8;
interface NotesLinesProps {
  notes: MidiNote[];
  minPitch: number;
  maxPitch: number;
  pxPerSec: number;
  height: number;
}

export const NotesLines = ({ notes, minPitch, maxPitch, pxPerSec, height }: NotesLinesProps) => {
  const pitchRange = Math.max(1, maxPitch - minPitch);

  return (
    <>
      {notes.map((n, idx) => {
        const left = n.startSec * pxPerSec;
        const w = Math.max(2, n.durationSec * pxPerSec);

        // Чем выше pitch, тем выше на панели (инверсия)
        const norm = (n.pitch - minPitch) / pitchRange; // 0..1
        const top = Math.round((1 - norm) * (height - noteH));

        return (
          <div
            key={`${n.trackIndex}-${idx}-${n.startSec}`}
            title={`pitch=${n.pitch} t=${n.startSec.toFixed(2)} dur=${n.durationSec.toFixed(2)} track=${n.trackIndex}`}
            style={{
              position: 'absolute',
              left,
              top,
              width: w,
              height: noteH,
              borderRadius: 6,
              background: '#4b7bec',
              opacity: 0.85,
            }}
          />
        );
      })}
    </>
  );
};
