import { App, Button } from 'antd';
import { type ChangeEvent, useRef } from 'react';
import type { MidiData } from '@/features/bayan/bayan.types';

const ACCEPT = '.mid,.midi,audio/midi,audio/x-midi';

type Props = {
  onMidiLoaded: (data: MidiData) => void;
  disabled: boolean;
};

export const MidiUploader = ({ onMidiLoaded, disabled }: Props) => {
  const { message } = App.useApp();
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    const data: MidiData = { file, arrayBuffer };
    onMidiLoaded(data);

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
      <Button type="primary" onClick={handlePick} disabled={disabled}>
        Загрузить MIDI
      </Button>

      <span style={{ opacity: 0.7, fontSize: 12 }}>.mid / .midi</span>
    </div>
  );
};
