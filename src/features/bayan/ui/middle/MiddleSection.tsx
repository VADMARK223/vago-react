import { Empty } from 'antd';
import { NotesTimeline } from '@/features/bayan/ui/middle/notes-timeline/NotesTimeline';
import { useBayanStore } from '@/features/bayan/model/store/bayan.store';

interface MiddleSectionProps {
  currentTimeSec: number;
}

export const MiddleSection = ({ currentTimeSec }: MiddleSectionProps) => {
  const parsed = useBayanStore((s) => s.parsed);
  const midiInfo = useBayanStore((s) => s.midi?.info);

  if (!parsed || !midiInfo) {
    return <Empty description="Выберите MIDI файл" />;
  }

  return (
    <NotesTimeline
      width={500}
      height={110}
      durationSec={parsed.durationSec}
      currentTimeSec={currentTimeSec ?? 0}
      pxPerSec={120}
    />
  );
};
