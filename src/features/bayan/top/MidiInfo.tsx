import styles from '../Bayan.module.css';
import { type ParsedMidi } from '@/features/bayan/bayan.store';
import { Button } from 'antd';
import { LucideIcon } from '@/shared/ui/LucideIcon';
import { Ear } from 'lucide-react';
import { useMidiAudioPlayer } from '@/features/bayan/top/use-midi-audio-player';
import { MidiUploader } from '@/features/bayan/top/MidiUploader';

type Props = {
  parsed: ParsedMidi | null;
  disabled: boolean;
};
export const MidiInfo = ({ parsed, disabled }: Props) => {
  const audio = useMidiAudioPlayer();

  const buttonDisabled = disabled || !parsed;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Файл</th>
          <th style={{ textAlign: 'center' }}>Прослушать</th>
          <th style={{ textAlign: 'center' }}>Длительность</th>
          <th style={{ textAlign: 'center' }}>Треков</th>
          <th style={{ textAlign: 'center' }}>Нот</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <MidiUploader disabled={disabled} />
          </td>
          <td style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              onClick={async () => {
                if (parsed) {
                  await audio.playNotes(parsed.notes);
                }
              }}
              disabled={buttonDisabled}
              icon={<LucideIcon icon={Ear} />}
            />
          </td>
          <td style={{ textAlign: 'center' }}>{parsed?.durationSec.toFixed(2) ?? '0'} сек</td>
          <td style={{ textAlign: 'center' }}>{parsed?.tracksCount ?? '-'}</td>
          <td style={{ textAlign: 'center' }}>{parsed?.notes.length ?? '-'}</td>
        </tr>
      </tbody>
    </table>
  );
};
