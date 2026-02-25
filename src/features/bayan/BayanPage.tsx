import styles from './Bayan.module.css';
import { Player } from '@/features/bayan/player/Player';
import { useSimplePlayer } from '@/features/bayan/use-simple-player';
import { NotesTable } from '@/features/bayan/NotesTable';
import { NotesTimeline } from '@/features/bayan/notes-timeline/NotesTimeline';
import { useBayanStore } from '@/features/bayan/bayan.store';
import { MidiInfo } from '@/features/bayan/top/MidiInfo';

const BayanPage = () => {
  const parsed = useBayanStore((s) => s.parsed);
  const midiInfo = useBayanStore((s) => s.midi?.info);

  const durationSec = parsed?.durationSec ?? 0;
  const player = useSimplePlayer({ durationSec });

  return (
    <div className={styles.container}>
      <MidiInfo parsed={parsed} disabled={player.isPlaying} />

      {parsed && (
        <NotesTimeline
          width={500}
          height={110}
          notes={parsed.notes}
          durationSec={parsed.durationSec}
          currentTimeSec={player.currentTimeSec}
          pxPerSec={120}
        />
      )}

      <Player
        isPlaying={player.isPlaying}
        onPlay={player.play}
        onPause={player.pause}
        onStop={player.stop}
        onSeek={player.seek}
        durationSec={player.durationSec}
        currentTimeSec={player.currentTimeSec}
      />

      {midiInfo && parsed && <NotesTable parsed={parsed} onSeek={player.seek} />}
    </div>
  );
};

export default BayanPage;
