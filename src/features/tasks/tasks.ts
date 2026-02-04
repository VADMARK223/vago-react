import {useQuery} from '@tanstack/react-query'
import {QUERY_KEY} from '../../constants/queryKeys.ts'
import {api, type KyResponse} from '../../shared/api/kyClient.ts'
import {URL} from '../../constants/urls.ts'

// type TasksResponse = KyResponse<{ Task[] }>
type Task = {
    id: number
    name: string
    description: string
    createdAt: Date
    completed: boolean
}
type TasksResponse = KyResponse<Task[]>

export const useTasks = () => {
    return useQuery({
        queryKey: [QUERY_KEY.TASKS],
        queryFn: async () => {
            const response = await api.get(URL.TASKS).json<TasksResponse>()
            return response.data
        },
    })
}