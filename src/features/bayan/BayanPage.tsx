import styles from './Bayan.module.css';
import { MidiUploader } from '@/features/bayan/MidiUploader';
import type { MidiData, MidiInfo } from '@/features/bayan/bayan.types';
import { useState } from 'react';
import { parseMidi } from '@/features/bayan/parseMidi';
import type { ParsedMidi } from '@/features/bayan/midi.types';
import { Player } from '@/features/bayan/player/Player';
import { useSimplePlayer } from '@/features/bayan/use-simple-player';
import { MidIInfo } from '@/features/bayan/MidIInfo';
import { NotesTimeline } from '@/features/bayan/notes-timeline/NotesTimeline';

const BayanPage = () => {
  const [midiInfo, setMidiInfo] = useState<MidiInfo | null>(null);
  const [parsed, setParsed] = useState<ParsedMidi | null>(null);

  const durationSec = parsed?.durationSec ?? 0;
  const player = useSimplePlayer({ durationSec });

  const onMidiLoaded = (data: MidiData) => {
    player.stop();
    setMidiInfo({ name: data.file.name, size: data.arrayBuffer.byteLength });
    setParsed(parseMidi(data.arrayBuffer));
  };

  return (
    <div className={styles.container}>
      <MidiUploader disabled={player.isPlaying} onMidiLoaded={onMidiLoaded} parsed={parsed} />
      <hr />

      {parsed && (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <NotesTimeline
            notes={parsed.notes}
            durationSec={parsed.durationSec}
            currentTimeSec={player.currentTimeSec}
            height={150}
            pxPerSec={120}
          />
        </div>
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

      {midiInfo && parsed && <MidIInfo midiInfo={midiInfo} parsed={parsed} />}
    </div>
  );
};

export default BayanPage;
