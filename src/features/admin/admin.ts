import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/queryKeys.ts';
import { api, type KyResponse } from '../../shared/api/ky-client.ts';
import { URL } from '../../constants/urls.ts';

type User = {
  id: number;
  login: string;
  username: string;
  role: string;
};

type UsersResponse = KyResponse<{ users: User[] }>;
type UserDeleteResponse = KyResponse;

export const useUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS],
    queryFn: () => api.get(URL.USERS).json<UsersResponse>(),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`${URL.USERS}/${id}`).json<UserDeleteResponse>(),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });
    },
  });
};
