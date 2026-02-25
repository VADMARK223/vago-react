import { StopButton } from '@/features/bayan/ui/bottom/player/StopButton';
import { PlayPauseButton } from '@/features/bayan/ui/bottom/player/PlayPauseButton';

type Props = {
  isPlaying: boolean;
  currentTimeSec: number;
  durationSec: number;

  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onSeek: (sec: number) => void;
};

export const Player = ({
  isPlaying,
  currentTimeSec,
  durationSec,
  onPlay,
  onPause,
  onStop,
  onSeek,
}: Props) => {
  const max = durationSec > 0 ? durationSec : 0;

  const isEnd = max !== 0 && currentTimeSec === max;

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
      <PlayPauseButton
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
        disabled={max === 0 || isEnd}
      />

      <StopButton onClick={onStop} disabled={max === 0 || currentTimeSec === 0} />

      <input
        type="range"
        min={0}
        max={max}
        step={0.01}
        value={Math.min(currentTimeSec, max)}
        onChange={(e) => onSeek(Number(e.currentTarget.value))}
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
        {currentTimeSec.toFixed(2)} / {durationSec.toFixed(2)} сек
      </div>
    </div>
  );
};
