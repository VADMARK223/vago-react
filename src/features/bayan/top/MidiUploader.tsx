import { App, Button } from 'antd';
import { type ChangeEvent, useEffect, useRef } from 'react';
import { Ear } from 'lucide-react';
import { LucideIcon } from '@/shared/ui/LucideIcon';
import { useMidiAudioPlayer } from '@/features/bayan/top/use-midi-audio-player';
import { loadFromStorage } from '@/features/bayan/parse-midi';
import { useBayanStore } from '@/features/bayan/bayan.store';

const ACCEPT = '.mid,.midi,audio/midi,audio/x-midi';

type Props = {
  disabled: boolean;
};

export const MidiUploader = ({ disabled }: Props) => {
  const parsed = useBayanStore((s) => s.midi?.parsed);
  const setMidiLoaded = useBayanStore((s) => s.setMidiLoaded);
  const reset = useBayanStore((s) => s.reset);

  const { message } = App.useApp();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const audio = useMidiAudioPlayer();

  useEffect(() => {
    const buffer = loadFromStorage();
    if (buffer) {
      setMidiLoaded({ arrayBuffer: buffer });
    }
  }, []);

  const handlePick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const name = file.name.toLowerCase();
    if (!name.endsWith('.mid') && !name.endsWith('.midi')) {
      message.warning('Похоже, это не MIDI файл (.mid/.midi).');
      e.target.value = '';
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    setMidiLoaded({ fileName: file.name, arrayBuffer });

    e.target.value = '';

    // saveToStorage(arrayBuffer);
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <Button type="primary" onClick={handlePick} disabled={disabled || !!parsed}>
        Загрузить MIDI
      </Button>

      <Button
        type="primary"
        danger
        onClick={() => {
          // resetStore();
          //audio.stop()?.();
          reset();
        }}
        disabled={disabled || !parsed}
      >
        Очистить выбор
      </Button>

      <span style={{ opacity: 0.7, fontSize: 12 }}>.mid / .midi</span>

      {parsed && (
        <Button
          onClick={() => {
            if (parsed) {
              audio.playNotes(parsed.notes).then();
            }
          }}
          disabled={disabled}
          icon={<LucideIcon icon={Ear} />}
        >
          Прослушать
        </Button>
      )}
    </div>
  );
};
