import { useSimplePlayer } from '@/features/bayan/model/hooks/useSimplePlayer';
import { useBayanStore } from '@/features/bayan/model/store/bayan.store';
import { TopSection } from '@/features/bayan/ui/top/TopSection';
import { MiddleSection } from '@/features/bayan/ui/middle/MiddleSection';
import { BottomSection } from '@/features/bayan/ui/bottom/BottomSection';

const BayanPage = () => {
  const parsed = useBayanStore((s) => s.parsed);
  const player = useSimplePlayer({ durationSec: parsed?.durationSec ?? 0 });

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <TopSection parsed={parsed} disabled={player.isPlaying} />
      <MiddleSection currentTimeSec={player.currentTimeSec} />
      <BottomSection
        player={player}
        notes={parsed?.notes ?? []}
        currentTimeSec={player.currentTimeSec}
      />
    </div>
  );
};

export default BayanPage;
