import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type ApiMessageResponse } from '@/shared/api/ky-client';
import { QUERY_KEY, URL } from '@/shared/constants';
import { message } from 'antd';

export const useAllDeleteMessages = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return api.delete(`${URL.MESSAGES}`).json<ApiMessageResponse>();
    },
    onSuccess: () => {
      message.success('Все сообщения удалены').then();
      qc.invalidateQueries({ queryKey: [QUERY_KEY.messages] }).then();
    },
    onError: () => {
      message.error('Error deleting messages').then();
    },
  });
};
