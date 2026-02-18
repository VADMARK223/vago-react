import { QUERY_KEY, URL } from '@/shared/constants';
import { api, type ApiMessageResponse } from '@/shared/api/ky-client';
import { useDeleteWithToast } from '@/shared/lib/react-query/use-delete-with-toast';
import type { Id } from '@/shared/types';

const deleteMessageRequest = async (id: Id) =>
  api.delete(`${URL.MESSAGES}/${id}`).json<ApiMessageResponse>();

export const useDeleteMessage = () =>
  useDeleteWithToast(deleteMessageRequest, {
    errorFallback: 'Ошибка удаления сообщения',
    successFallback: 'Сообщение удалёно',
    invalidateQueryKeys: [[QUERY_KEY.messages]],
  });
