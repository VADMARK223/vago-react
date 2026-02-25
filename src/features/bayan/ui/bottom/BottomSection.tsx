import { type MidiNote } from '@/features/bayan/model/store/bayan.store';
import { NotesTable } from '@/features/bayan/ui/bottom/NotesTable';
import { Player } from '@/features/bayan/ui/bottom/player/Player';
import type { SimplePlayer } from '@/features/bayan/model/hooks/useSimplePlayer';

type Props = {
  notes: MidiNote[];
  player: SimplePlayer;
  currentTimeSec: number;
};

export const BottomSection = ({ player, notes, currentTimeSec }: Props) => {
  return (
    <>
      <Player player={player} />
      <NotesTable notes={notes} onSeek={player.seek} currentTimeSec={currentTimeSec} />
    </>
  );
};
