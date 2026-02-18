import { api, type ApiMessageResponse } from '@/shared/api/ky-client';
import { URL } from '@/shared/constants';
import type { MessageResponse } from '@/shared/api/messages/messages.types';

type MessagesResponse = ApiMessageResponse<{ messages: MessageResponse[] }>;

export const getMessages = async () => {
  const resp = await api.get(URL.MESSAGES).json<MessagesResponse>();
  return resp.data;
};

/*export const useAddMessage = async () => {
  const resp = await api.get(URL.MESSAGES).json<MessagesResponse>();
  return resp.data;
}*/
