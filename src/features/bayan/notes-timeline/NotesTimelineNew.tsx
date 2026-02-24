import type { MidiNote } from '@/features/bayan/midi.types';
import {
  midiToTrebleStaffStep,
  staffStepToY,
} from '@/features/bayan/notes-timeline/notes-timeline';
import { NoteGlyphNew } from '@/features/bayan/notes-timeline/NoteGlyphNew';

type Props = {
  notes: MidiNote[];
  durationSec: number;
  currentTimeSec: number;

  height: number; // высота панели нот
  pxPerSec?: number; // масштаб по времени (пикселей на секунду
};

export const NotesTimelineNew = ({ currentTimeSec, notes, height, pxPerSec = 120 }: Props) => {
  const width = 500;
  const lineGap = 14; // расстояние между линиями
  const staffTop = 20;

  const staffBottomLineY = staffTop + 4 * lineGap; // 5 линий => 4 промежутка

  const playheadX = currentTimeSec * pxPerSec;

  return (
    <svg
      width={width}
      height={height}
      style={{
        backgroundColor: 'gray',
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
            // strokeOpacity={0.15}
            strokeWidth={1}
          />
        );
      })}

      {notes.map((n) => {
        const x = n.startSec * pxPerSec;

        const step = midiToTrebleStaffStep(n.pitch);
        const y = staffStepToY(step, staffBottomLineY, lineGap);

        const isFilled = n.durationSec < 1; // потом переделаем на настоящие длительности

        return (
          <NoteGlyphNew
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
