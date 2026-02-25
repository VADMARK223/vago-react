import styles from './BottomSection.module.css';
import { Table } from 'antd';
import { useState } from 'react';
import type { MidiNote } from '@/features/bayan/model/store/bayan.store';

interface MidIInfoProps {
  notes: MidiNote[];
  onSeek: (sec: number) => void;
}
const columns = [
  {
    title: 'Старт',
    dataIndex: 'startSec',
    render: (val: number) => {
      return <>{val.toFixed(3)}</>;
    },
  },
  {
    title: 'Длительность',
    key: 'durationSec',
    render: (_: unknown, r: MidiNote) => (r.endSec - r.startSec).toFixed(3),
  },
  {
    title: 'Pitch (высота)',
    dataIndex: 'pitch',
    render: (val: number) => <>{val}</>,
  },
  {
    title: 'Нота',
    dataIndex: 'note',
  },
  {
    title: 'Velocity (сила)',
    dataIndex: 'velocity',
    render: (val: number) => {
      return <>{val.toFixed(2)}</>;
    },
  },
  {
    title: 'Индекс трека',
    dataIndex: 'trackIndex',
    hidden: false,
  },
];

const makeRowKey = (r: MidiNote) => `${r.trackIndex}-${r.startSec}-${r.pitch}-${r.endSec}`;

export const NotesTable = ({ notes, onSeek }: MidIInfoProps) => {
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);

  const handleRowClick = (record: MidiNote) => {
    const key = makeRowKey(record);
    setSelectedRowKey(key);
    onSeek(record.startSec);
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        <Table<MidiNote>
          rowKey={makeRowKey}
          dataSource={notes}
          columns={columns}
          pagination={false}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: selectedRowKey ? [selectedRowKey] : [],
            onChange: (keys) => setSelectedRowKey((keys[0] as string) ?? null),
          }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          rowClassName={(record) =>
            makeRowKey(record) === selectedRowKey ? styles.selectedRow : ''
          }
        />
      </div>
    </div>
  );
};
