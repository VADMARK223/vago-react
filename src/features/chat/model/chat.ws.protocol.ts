import type { ErrorPayload, MessageDTO } from '@/shared/api/messages/messages.types';
import type { OnlineUser } from '@/features/chat/model/chat.store';

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
  | { type: 'users.snapshot'; payload: { users: OnlineUser[] } }
  | { type: 'user.joined'; payload: OnlineUser }
  | { type: 'user.left'; payload: { userId: number } }
  | { type: 'error'; payload: ErrorPayload };

export type MessageSendPayload = {
  text: string;
};

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

export const isOutboundEnvelope = (value: unknown): value is { type: string; payload: unknown } => {
  return isObject(value) && typeof value.type === 'string' && 'payload' in value;
};
