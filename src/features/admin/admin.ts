import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY, URL } from '@/shared/constants';
import { api, type ApiMessageResponse } from '@/shared/api/ky-client';
import type { Id } from '@/shared/types';
import { useDeleteWithToast } from '@/shared/lib/react-query/use-delete-with-toast';

export type User = {
  id: Id;
  login: string;
  username: string;
  role: string;
};

type UsersResponse = ApiMessageResponse<{ users: User[] }>;

export const useUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.users],
    queryFn: async () => {
      const resp = await api.get(URL.USERS).json<UsersResponse>();
      return resp.data;
    },
  });
};

const deleteUserRequest = async (id: Id) => {
  return api.delete(`${URL.USERS}/${id}`).json<ApiMessageResponse>();
};

export const useDeleteUser = () => {
  return useDeleteWithToast(deleteUserRequest, {
    errorFallback: 'Ошибка удаления пользователя',
    successFallback: 'Пользователь удалён',
    invalidateQueryKeys: [[QUERY_KEY.users]],
  });
};

const deleteMessageRequest = async (id: Id) => {
  return api.delete(`${URL.MESSAGES}/${id}`).json<ApiMessageResponse>();
};

export const useDeleteMessage = () => {
  return useDeleteWithToast(deleteMessageRequest, {
    errorFallback: 'Ошибка удаления сообщения',
    successFallback: 'Сообщение удалёно',
    invalidateQueryKeys: [[QUERY_KEY.messages]],
  });
};
