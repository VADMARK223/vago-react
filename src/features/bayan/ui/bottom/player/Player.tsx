import { BackButton } from '@/features/bayan/ui/bottom/player/BackButton';
import { PlayPauseButton } from '@/features/bayan/ui/bottom/player/PlayPauseButton';
import type { SimplePlayer } from '@/features/bayan/model/hooks/useSimplePlayer';
import { ReplayButton } from '@/features/bayan/ui/bottom/player/ReplayButton';

type Props = {
  player: SimplePlayer;
};

export const Player = ({ player }: Props) => {
  const max = player.durationSec > 0 ? player.durationSec : 0;

  const isEnd = max !== 0 && player.currentTimeSec === max;

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        padding: 12,
        border: '1px solid #0002',
        borderRadius: 12,
      }}
    >
      {isEnd ? (
        <ReplayButton onClick={player.replay} />
      ) : (
        <PlayPauseButton
          isPlaying={player.isPlaying}
          onPlay={player.play}
          onPause={player.pause}
          disabled={max === 0 || isEnd}
        />
      )}

      <BackButton onClick={player.stop} disabled={max === 0 || player.currentTimeSec === 0} />

      <input
        type="range"
        min={0}
        max={max}
        step={0.01}
        value={Math.min(player.currentTimeSec, max)}
        onChange={(e) => player.seek(Number(e.currentTarget.value))}
        style={{ flex: 1 }}
        disabled={max === 0}
      />

      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
          opacity: 0.8,
          minWidth: 140,
          textAlign: 'right',
        }}
      >
        {player.currentTimeSec.toFixed(2)} / {player.durationSec.toFixed(2)} сек
      </div>
    </div>
  );
};
