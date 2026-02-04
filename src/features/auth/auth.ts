import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {api, type KyResponse} from '../../shared/api/kyClient.ts'
import {QUERY_KEY} from '../../constants/queryKeys.ts'
import {URL} from '../../constants/urls.ts'
import {CODE} from '../../constants/codes.ts'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../constants/routes.ts'
import {MUTATION_KEY} from '../../constants/mutationKeys.ts'

export type AuthRedirectState = {
    from?: { pathname: string }
}

export function useSignInRedirect() {
    const navigate = useNavigate()

    return (targetPathname: string) => {
        const state: AuthRedirectState = {
            from: { pathname: targetPathname },
        }
        navigate(ROUTE.SIGN_IN, { state })
    }
}

export type User = {
    username: string;
    role: string
}

type MeResponse = KyResponse<User>

export type SignInRequest = {
    login: string;
    password: string;
}

export type SignUpRequest = {
    login: string
    password: string
    username: string
}

export interface SignUpFormValues {
    [CODE.LOGIN]?: string
    [CODE.PASSWORD]?: string
    [CODE.USERNAME]?: string
}

type SignInResponse = KyResponse
export type SignUpResponse = KyResponse

export const useMe = () => {
    return useQuery({
        queryKey: [QUERY_KEY.ME],
        queryFn: async () => {
            const response = await api.get(URL.ME).json<MeResponse>()
            return response.data
        },
        retry: false,
        // staleTime: Infinity,
        staleTime: 60_000, // 1 min
        refetchOnWindowFocus: false,
    })
}


export const useAuth = () => {
    const {data: me, isLoading, isError} = useMe()

    const isAuthed = !!me && !isError
    const isAdmin = !!me?.role?.includes("admin")

    return {me, isLoading, isAuthed, isAdmin}
}


export const useSignInMutation = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationKey: MUTATION_KEY.SIGN_IN,
        mutationFn: signInRequest,
        onSuccess: () => {
            qc.invalidateQueries({queryKey: [QUERY_KEY.ME]}).then()
        },
    })
}

export const useSignUpMutation = () => {
    return useMutation({mutationFn: signUpRequest})
}

const signInRequest = async (data: SignInRequest) => {
    return api.post(URL.SIGN_IN, {json: data,}).json<SignInResponse>()
}

const signUpRequest = async (data: SignUpRequest) => {
    return api.post(URL.SIGN_UP, {json: data,}).json<SignUpResponse>()
}

export const toSignUpRequest = (values: SignUpFormValues): SignUpRequest => {
    const login = values[CODE.LOGIN]
    const password = values[CODE.PASSWORD]
    const username = values[CODE.USERNAME]

    if (!login || !password || !username) {
        throw new Error('Form values are incomplete')
    }

    return {login, password, username}
}
