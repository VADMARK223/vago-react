import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '../../constants/queryKeys.ts';
import {api, type KyResponse} from '../../shared/api/kyClient.ts';
import {URL} from '../../constants/urls.ts';

type User = {
    id: number;
    login: string;
    username: string;
    role: string;
}

type UsersResponse = KyResponse<{ users: User[] }>

export const useUsers = () => {
    return useQuery({
        queryKey: [QUERY_KEY.USERS],
        queryFn: () => api.get(URL.USERS).json<UsersResponse>(),
    })
}