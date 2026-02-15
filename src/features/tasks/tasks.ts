import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY, URL } from '@/shared/constants';
import { api, type ApiMessageResponse } from '@/shared/api/ky-client';
import type { Id } from '@/shared/types';

type Task = {
  id: Id;
  name: string;
  description: string;
  createdAt: Date;
  completed: boolean;
};
type TasksResponse = ApiMessageResponse<Task[]>;
type TaskResponse = ApiMessageResponse;

export interface TaskRequest {
  name: string;
  description?: string;
  completed: boolean;
}

export const useTasks = () => {
  return useQuery({
    queryKey: [QUERY_KEY.tasks],
    queryFn: async () => {
      const response = await api.get(URL.TASKS).json<TasksResponse>();
      return response.data;
    },
  });
};

export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskRequest) => {
      return await api.post(URL.TASKS, { json: data }).json<TaskResponse>();
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [QUERY_KEY.tasks] });
    },
  });
};

export const useDeleteTask = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`${URL.TASKS}/${id}`).json<TaskResponse>(),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [QUERY_KEY.tasks] });
    },
  });
};

export const useUpdateTaskMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, completed }: { id: Id; completed: boolean }) => {
      return api
        .put(`${URL.TASKS}/${id}`, {
          json: { completed },
        })
        .json<ApiMessageResponse>();
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [QUERY_KEY.tasks] });
    },
  });
};
