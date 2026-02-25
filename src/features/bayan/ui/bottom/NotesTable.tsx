import styles from './BottomSection.module.css';
import { Table } from 'antd';
import { useMemo } from 'react';
import type { MidiNote } from '@/features/bayan/model/store/bayan.store';

interface MidIInfoProps {
  notes: MidiNote[];
  currentTimeSec: number;
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

// бинарный поиск "ноты по времени" (notes должны быть отсортированы по startSec)
function findActiveIndex(notes: MidiNote[], t: number): number | null {
  let l = 0;
  let r = notes.length - 1;
  let candidate = -1;

  while (l <= r) {
    const m = (l + r) >> 1;
    if (notes[m].startSec <= t) {
      candidate = m;
      l = m + 1;
    } else {
      r = m - 1;
    }
  }

  if (candidate === -1) {
    return null;
  }

  // если точное попадание в диапазон — ок
  if (t < notes[candidate].endSec) {
    return candidate;
  }

  // иначе можешь вернуть null, либо candidate (последнюю прошедшую)
  return null;
}

export const NotesTable = ({ notes, currentTimeSec, onSeek }: MidIInfoProps) => {
  // const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);
  const sortedNotes = useMemo(() => {
    return [...notes].sort(
      (a, b) => a.startSec - b.startSec || a.trackIndex - b.trackIndex || a.pitch - b.pitch,
    );
  }, [notes]);

  const activeIndex = useMemo(
    () => findActiveIndex(sortedNotes, currentTimeSec),
    [sortedNotes, currentTimeSec],
  );
  const activeKey = useMemo(
    () => (activeIndex == null ? null : makeRowKey(sortedNotes[activeIndex])),
    [sortedNotes, activeIndex],
  );

  // опционально: автоскролл к активной строке
  /*const activeRowRef = useRef<HTMLTableRowElement | null>(null);
  useEffect(() => {
    activeRowRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeKey]);*/

  const handleRowClick = (record: MidiNote) => {
    onSeek(record.startSec);
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        <Table<MidiNote>
          rowKey={makeRowKey}
          dataSource={sortedNotes}
          columns={columns}
          pagination={false}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: activeKey ? [activeKey] : [],
            // можно вообще убрать onChange, или оставить и делать seek:
            onChange: (keys) => {
              const key = keys[0] as string | undefined;
              const note = key ? sortedNotes.find((n) => makeRowKey(n) === key) : null;
              if (note) {
                onSeek(note.startSec);
              }
            },
            /*onChange: (keys) => {
              const key = keys[0] as string | undefined;
              const note = key ? sortedNotes.find((n) => makeRowKey(n) === key) : null;
              if (note) onSeek(note.startSec);
            },*/
          }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            /*ref:
              makeRowKey(record) === activeKey
                ? (node) => (activeRowRef.current = node)
                : undefined, */
          })}
          rowClassName={(record) => (makeRowKey(record) === activeKey ? styles.selectedRow : '')}
        />
      </div>
    </div>
  );
};
