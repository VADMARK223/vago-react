import { type MidiNote } from '@/features/bayan/model/store/bayan.store';
import { NotesTable } from '@/features/bayan/ui/bottom/NotesTable';
import { Player } from '@/features/bayan/ui/bottom/player/Player';
import type { SimplePlayer } from '@/features/bayan/model/hooks/useSimplePlayer';

type Props = {
  notes: MidiNote[];
  player: SimplePlayer;
};

export const BottomSection = ({ player, notes }: Props) => {
  return (
    <>
      <Player
        isPlaying={player.isPlaying}
        onPlay={player.play}
        onPause={player.pause}
        onStop={player.stop}
        onSeek={player.seek}
        durationSec={player.durationSec}
        currentTimeSec={player.currentTimeSec}
      />
      <NotesTable notes={notes} onSeek={player.seek} />
    </>
  );
};
