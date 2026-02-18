import type { ErrorPayload, MessageDTO } from '@/shared/api/messages/messages.types';

export const getWsUrl = () => {
  return `ws://${location.hostname}:5555/ws`;
};

export const getCookie = (name: string) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : '';
};

// inbound (client -> server)
export type ChatInbound<T = unknown> = {
  type: string;
  payload: T;
};

// outbound (server -> client)
export type ChatOutbound =
  | { type: 'message.new'; payload: MessageDTO }
  | { type: 'error'; payload: ErrorPayload };

export type MessageSendPayload = {
  text: string;
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

export const isOutbound = (value: unknown): value is ChatOutbound => {
  if (!isObject(value)) {
    return false;
  }

  if (typeof value.type !== 'string') {
    return false;
  }
  if (!('payload' in value)) {
    return false;
  }

  const payload = value.payload;

  if (value.type === 'message.new') {
    return (
      isObject(payload) &&
      typeof payload.id !== 'undefined' &&
      typeof payload.authorId === 'number' &&
      typeof payload.body === 'string' &&
      typeof payload.sentAt === 'string' &&
      typeof payload.type === 'string' &&
      typeof payload.username === 'string'
    );
  }

  if (value.type === 'error') {
    return isObject(payload) && typeof payload.message === 'string';
  }

  return false;
};
