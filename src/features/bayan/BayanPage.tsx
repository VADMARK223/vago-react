import styles from './Bayan.module.css';
import { MidiUploader } from '@/features/bayan/top/MidiUploader';
import { Player } from '@/features/bayan/player/Player';
import { useSimplePlayer } from '@/features/bayan/use-simple-player';
import { MidIInfo } from '@/features/bayan/MidIInfo';
import { NotesTimeline } from '@/features/bayan/notes-timeline/NotesTimeline';
import { useBayanStore } from '@/features/bayan/bayan.store';

const BayanPage = () => {
  const parsed = useBayanStore((s) => s.midi?.parsed);
  const midiInfo = useBayanStore((s) => s.midi?.info);

  const durationSec = parsed?.durationSec ?? 0;
  const player = useSimplePlayer({ durationSec });

  return (
    <div className={styles.container}>
      <MidiUploader disabled={player.isPlaying} />
      <hr />

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

      {midiInfo && parsed && <MidIInfo midiInfo={midiInfo} parsed={parsed} onSeek={player.seek} />}
    </div>
  );
};

export default BayanPage;
