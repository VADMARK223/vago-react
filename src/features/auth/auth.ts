import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {api, type KyResponse} from '../../shared/api/kyClient.ts';
import {QUERY_KEY} from '../../constants/queryKeys.ts';
import {URL} from '../../constants/urls.ts';
import {CODE} from '../../constants/codes.ts';

export type AuthRedirectState = {
    from?: { pathname: string }
}

export type UserData = {
    id: number;
    username: string;
}

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
        queryFn: () => api.get(URL.ME).json<UserData>(),
        retry: false,
    });
}

export const useSignInMutation = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: signInRequest,
        onSuccess: () => {
            qc.invalidateQueries({queryKey: [QUERY_KEY.ME]})
        },
    })
}

export const useSignUpMutation = () => {
    return useMutation({mutationFn: signUpRequest})
}

const signInRequest = async (data: SignInRequest) => {
    return api.post(URL.LOGIN, {json: data,}).json<SignInResponse>()
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

    return { login, password, username }
}
