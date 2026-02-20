import type { MidiNote } from '@/features/bayan/midi.types';

const noteH = 8;

type Props = {
  notes: MidiNote[];
  durationSec: number;
  currentTimeSec: number;

  height?: number; // высота панели нот
  pxPerSec?: number; // масштаб по времени (пикселей на секунду
};

export const NotesTimeline = ({
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

  const pitchRange = Math.max(1, maxPitch - minPitch);

  const playheadLeft = currentTimeSec * pxPerSec;

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
          background: 'gray',
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

        {/* ноты */}
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
      </div>
    </div>
  );
};
