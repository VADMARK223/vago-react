import { App, Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type ApiMessageResponse } from '@/shared/api/ky-client';
import { QUERY_KEY, URL } from '@/shared/constants';

export const DeleteAllMessagesButton = () => {
  const { message } = App.useApp();
  const qc = useQueryClient();

  const mutation = useMutation({
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

  return (
    <Button danger onClick={() => mutation.mutate()}>
      Удалить все сообщения
    </Button>
  );
};
