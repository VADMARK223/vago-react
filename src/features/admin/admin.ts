import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY, URL } from '@/shared/constants';
import { api, type KyResponse } from '@/shared/api/ky-client.ts';
import type { Id, MessageResponse } from '@/shared/types.ts';

export type User = {
  id: Id;
  login: string;
  username: string;
  role: string;
};

type UsersResponse = KyResponse<{ users: User[] }>;

type MessagesResponse = KyResponse<{ messages: MessageResponse[] }>;

export const useUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS],
    queryFn: async () => {
      const resp = await api.get(URL.USERS).json<UsersResponse>();
      return resp.data;
    },
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`${URL.USERS}/${id}`).json<KyResponse>(),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });
    },
  });
};

export const useMessages = () => {
  return useQuery({
    queryKey: [QUERY_KEY.MESSAGES],
    queryFn: async () => {
      const resp = await api.get(URL.MESSAGES).json<MessagesResponse>();
      return resp.data;
    },
  });
};

export const useDeleteMessage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`${URL.MESSAGES}/${id}`).json<KyResponse>(),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [QUERY_KEY.MESSAGES] });
    },
  });
};
