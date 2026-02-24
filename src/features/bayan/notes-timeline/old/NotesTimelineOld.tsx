import { NoteGlyphOld } from '@/features/bayan/notes-timeline/old/NoteGlyphOld';
import { NotesLines } from '@/features/bayan/notes-timeline/old/NotesLines';
import type { MidiNote } from '@/features/bayan/bayan.store';

const notesLinesEnable = false; // ноты (палочки)

type Props = {
  notes: MidiNote[];
  durationSec: number;
  currentTimeSec: number;

  height?: number; // высота панели нот
  pxPerSec?: number; // масштаб по времени (пикселей на секунду
};

export const NotesTimelineOld = ({
  notes,
  durationSec,
  currentTimeSec,
  height = 140,
  pxPerSec = 120,
}: Props) => {
  const widthPx = Math.max(1, Math.ceil(durationSec * pxPerSec));

  // Находим диапазон pitch, чтобы разложить по вертикали
  let minPitch = Infinity;
  let maxPitch = -Infinity;

  for (let i = 0; i < notes.length; i++) {
    const p = notes[i].pitch;
    if (p < minPitch) {
      minPitch = p;
    }
    if (p > maxPitch) {
      maxPitch = p;
    }
  }

  if (!Number.isFinite(minPitch) || !Number.isFinite(maxPitch)) {
    minPitch = 60;
    maxPitch = 60;
  }

  const playheadLeft = currentTimeSec * pxPerSec;

  // вертикальная шкала: чем выше midi, тем меньше y
  const minMidi = Math.min(...notes.map((n) => n.pitch));
  const maxMidi = Math.max(...notes.map((n) => n.pitch));

  const padding = 20;
  const usableH = Math.max(1, height - padding * 2);

  const yOfMidi = (midi: number) => {
    const t = (midi - minMidi) / Math.max(1, maxMidi - minMidi);
    // t=0 низ -> y внизу, t=1 верх -> y вверху
    return padding + (1 - t) * usableH;
  };

  const width = Math.max(1, ...notes.map((n) => (n.startSec + n.durationSec) * pxPerSec));

  return (
    <div
      style={{
        width: '100%',
        border: '1px solid #0002',
        borderRadius: 12,
        // overflowX: 'auto',
        overflowY: 'hidden',
        background: '#fff',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: widthPx,
          height,
        }}
      >
        {/* 🔹 playhead */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: playheadLeft,
            width: 2,
            background: '#ff4d4f',
            zIndex: 10,
          }}
        />

        {/* горизонтальные сетка */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: Math.round((i * height) / 8),
              height: 1,
              background: '#0001',
            }}
          />
        ))}

        {notesLinesEnable && (
          <NotesLines
            notes={notes}
            minPitch={minPitch}
            maxPitch={maxPitch}
            pxPerSec={pxPerSec}
            height={height}
          />
        )}

        <svg
          width={width}
          height={height}
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'visible',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          {notes.map((n) => {
            const x = n.startSec * pxPerSec;
            const y = yOfMidi(n.pitch);

            // если хочешь длительности: можно делать “хвостики/флаги” позже.
            // пока просто filled/empty по длительности
            const isFilled = n.durationSec < 1; // заглушка, подстроишь под свою шкалу

            return <NoteGlyphOld key={n.startSec} x={x} y={y} midi={n.pitch} isFilled={isFilled} />;
          })}
        </svg>
      </div>
    </div>
  );
};
