import { App, Button } from 'antd';
import { type ChangeEvent, useEffect, useRef } from 'react';
import { loadFromStorage } from '@/features/bayan/parse-midi';
import { useBayanStore } from '@/features/bayan/bayan.store';

const ACCEPT = '.mid,.midi,audio/midi,audio/x-midi';

type Props = {
  disabled: boolean;
};

export const MidiUploader = ({ disabled }: Props) => {
  const parsed = useBayanStore((s) => s.parsed);
  const setMidiLoaded = useBayanStore((s) => s.setMidiLoaded);
  const reset = useBayanStore((s) => s.reset);

  const { message } = App.useApp();
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const audio = useMidiAudioPlayer();

  useEffect(() => {
    const buffer = loadFromStorage();
    if (buffer) {
      setMidiLoaded({ arrayBuffer: buffer });
    }
  }, [setMidiLoaded]);

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
      {parsed ? (
        <Button
          type="primary"
          danger
          onClick={() => {
            //audio.stop()?.();
            reset();
          }}
          disabled={disabled || !parsed}
        >
          Сбросить выбранный файл
        </Button>
      ) : (
        <Button type="primary" onClick={handlePick} disabled={disabled || !!parsed}>
          Загрузить MIDI-файл
        </Button>
      )}

      <span style={{ opacity: 0.7, fontSize: 12 }}>.mid / .midi</span>
    </div>
  );
};
