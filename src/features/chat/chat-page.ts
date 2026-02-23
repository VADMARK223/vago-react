import type { MessageDTO } from '@/shared/api/messages/messages.types';

export type UiMessage = MessageDTO & {
  isMine: boolean;
};

export type ChatListItem =
  | { kind: 'date'; id: string; dateKey: string; label: string }
  | { kind: 'message'; id: string; msg: UiMessage };

export const buildChatListItems = (messages: UiMessage[]) => {
  const res: ChatListItem[] = [];
  let lastDateKey: string | null = null;

  for (const m of messages) {
    const d = new Date(m.sentAt);
    const dateKey = formatDateKey(d);

    if (dateKey !== lastDateKey) {
      res.push({
        kind: 'date',
        id: `date:${dateKey}`,
        dateKey,
        // label: formatDateLabel(d),
        label: formatDateDividerLabel(d),
      });
      lastDateKey = dateKey;
    }

    res.push({
      kind: 'message',
      id: `msg:${m.id}`,
      msg: m,
    });
  }

  return res;
};

/**
 * Метод получения ключа для группировки: "2026-02-23"
 */
const formatDateKey = (d: Date) => {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const pad2 = (n: number) => {
  return String(n).padStart(2, '0');
};

export const formatTime = (d: Date) => {
  return d.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const isSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const formatDateDividerLabel = (date: Date): string => {
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) {
    return 'Сегодня';
  }

  if (isSameDay(date, yesterday)) {
    return 'Вчера';
  }

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
