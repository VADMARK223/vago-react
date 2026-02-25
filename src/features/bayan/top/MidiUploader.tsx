import { App, Button } from 'antd';
import { type ChangeEvent, useEffect, useRef } from 'react';
import { loadFromStorage } from '@/features/bayan/parse-midi';
import { useBayanStore } from '@/features/bayan/bayan.store';
import { HStack } from '@/shared/ui/h-stack/HStack';
import { LucideIcon } from '@/shared/ui/LucideIcon';
import { Trash } from 'lucide-react';

const ACCEPT = '.mid,.midi,audio/midi,audio/x-midi';

type Props = {
  disabled: boolean;
};

export const MidiUploader = ({ disabled }: Props) => {
  const parsed = useBayanStore((s) => s.parsed);
  const setMidiLoaded = useBayanStore((s) => s.setMidiLoaded);
  const midiInfo = useBayanStore((s) => s.midi?.info);
  const reset = useBayanStore((s) => s.reset);

  const { message } = App.useApp();
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      {midiInfo ? (
        <HStack>
          {midiInfo?.name}
          <Button
            type="primary"
            danger
            onClick={() => {
              //audio.stop()?.();
              reset();
            }}
            disabled={disabled || !parsed}
            icon={<LucideIcon icon={Trash} />}
          />
        </HStack>
      ) : (
        <Button type="primary" onClick={handlePick} disabled={disabled || !!parsed}>
          Загрузить MIDI-файл
        </Button>
      )}
    </div>
  );
};
