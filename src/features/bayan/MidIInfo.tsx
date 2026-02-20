import type { ParsedMidi } from '@/features/bayan/midi.types';
import type { MidiInfo } from '@/features/bayan/bayan.types';

interface MidIInfoProps {
  parsed: ParsedMidi;
  midiInfo: MidiInfo;
}

export const MidIInfo = ({ midiInfo, parsed }: MidIInfoProps) => {
  return (
    <div>
      <div style={{ marginTop: 12, opacity: 0.8 }}>
        <h2>
          Загружен: {midiInfo.name} ({midiInfo.size} байт)
        </h2>
      </div>

      <div style={{ marginTop: 12, opacity: 0.9 }}>
        <div>
          <b>Файл:</b> {midiInfo.name}
        </div>
        <div>
          <b>Длительность:</b> {parsed.durationSec.toFixed(2)} сек
        </div>
        <div>
          <b>Треков:</b> {parsed.tracksCount}
        </div>
        <div>
          <b>Нот:</b> {parsed.notes.length}
        </div>

        <div
          style={{ marginTop: 10, fontFamily: 'monospace', fontSize: 12, whiteSpace: 'pre-wrap' }}
        >
          {parsed.notes.slice(0, 10).map((n, i) => (
            <div key={i}>
              t={n.startSec.toFixed(3)}..{n.endSec.toFixed(3)} pitch={n.pitch} vel=
              {n.velocity.toFixed(2)} track={n.trackIndex}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
