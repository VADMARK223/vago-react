import {
  midiToTrebleStaffStep,
  staffStepToY,
} from '@/features/bayan/ui/middle/notes-timeline/notesTimeline.utils';
import { NoteGlyph } from '@/features/bayan/ui/middle/notes-timeline/NoteGlyph';
import { useBayanStore } from '@/features/bayan/model/store/bayan.store';

type Props = {
  width: number;
  height: number;

  durationSec: number;
  currentTimeSec: number;
  pxPerSec?: number; // масштаб по времени (пикселей на секунду
};

export const NotesTimeline = ({ width, height, currentTimeSec, pxPerSec = 120 }: Props) => {
  const parsed = useBayanStore((s) => s.parsed);
  const lineGap = 14;
  const staffTop = 20;

  const staffBottomLineY = staffTop + 4 * lineGap; // 5 линий => 4 промежутка

  const playheadX = currentTimeSec * pxPerSec;

  return (
    <svg
      width={width}
      height={height}
      style={{
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      {/* 🔹 playhead (SVG) */}
      <line x1={playheadX} y1={0} x2={playheadX} y2={height} stroke="#ff4d4f" strokeWidth={2} />

      {/* 5 линий нотоносца */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = staffTop + i * lineGap;
        return (
          <line
            key={i}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke="#000"
            strokeOpacity={0.5}
            strokeWidth={1}
          />
        );
      })}

      {parsed?.notes.map((n) => {
        const x = n.startSec * pxPerSec;
        const step = midiToTrebleStaffStep(n.pitch);
        const y = staffStepToY(step, staffBottomLineY, lineGap);

        const isFilled = n.durationSec < 1; // потом переделаем на настоящие длительности

        return (
          <NoteGlyph
            key={`${n.trackIndex}-${n.startSec}-${n.pitch}`}
            x={x}
            y={y}
            midi={n.pitch}
            isFilled={isFilled}
            staffStep={step}
            staffTop={staffTop}
            staffBottomLineY={staffBottomLineY}
            lineGap={lineGap}
          />
        );
      })}
    </svg>
  );
};
