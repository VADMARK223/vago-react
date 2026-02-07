import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {QUERY_KEY} from '../../constants/queryKeys.ts'
import {api, type KyResponse} from '../../shared/api/kyClient.ts'
import {URL} from '../../constants/urls.ts'

type Task = {
    id: number
    name: string
    description: string
    createdAt: Date
    completed: boolean
}
type TasksResponse = KyResponse<Task[]>
type TaskResponse = KyResponse

export interface TaskRequest {
    name: string
    description?: string
    completed: boolean
}

export const useTasks = () => {
    return useQuery({
        queryKey: [QUERY_KEY.TASKS],
        queryFn: async () => {
            const response = await api.get(URL.TASKS).json<TasksResponse>()
            return response.data
        },
    })
}

export const useCreateTask = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async (data: TaskRequest) => {
            console.log('data', data)
            return await api.post(URL.TASKS, {json: data}).json<TaskResponse>()
        },
        onSuccess: async () => {
            await qc.invalidateQueries({queryKey: [QUERY_KEY.TASKS]})
        }
    })
}

export const useDeleteTask = () => {
    const qc = useQueryClient()

    return useMutation({
            mutationFn: (id: number) => api.delete(`${URL.TASKS}/${id}`).json<TaskResponse>(),
            onSuccess: async () => {
                await qc.invalidateQueries({queryKey: [QUERY_KEY.TASKS]})
            }
        }
    )
}

export const useUpdateTaskMutation = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
            return api.put(`${URL.TASKS}/${id}`, {
                json: { completed }
            }).json<KyResponse>()
        },
        onSuccess: async () => {
            await qc.invalidateQueries({queryKey: [QUERY_KEY.TASKS]})
        }
    })
}
