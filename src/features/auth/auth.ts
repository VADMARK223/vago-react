import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {api} from '../../shared/api/kyClient.ts';
import {message} from 'antd';
import {HTTPError} from 'ky';
import {QUERY_KEY} from '../../constants/queryKeys.ts';
import {URL} from '../../constants/urls.ts';
import {CODE} from '../../constants/codes.ts';

export type UserData = {
    id: number;
    username: string;
}

export const useMe = () => {
    return useQuery({
        queryKey: [QUERY_KEY.ME],
        queryFn: () => api.get(URL.ME).json<UserData>(),
        retry: false,
    });
}

export type SignInRequest = {
    login: string;
    password: string;
}

type SignInResponse = {
    message: string;
}

async function signInRequest(data: SignInRequest): Promise<SignInResponse> {
    return api.post(URL.LOGIN, {
        json: data,
    }).json<SignInResponse>()
}

export const useSignInMutation = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: signInRequest,
        onSuccess: async (data: SignInResponse) => {
            await qc.invalidateQueries({queryKey: [QUERY_KEY.ME]})
            message.success(`${data.message}`)
        },
        onError: async (error) => {
            if (error instanceof HTTPError) {
                const body = await error.response.json<SignInResponse>();
                message.error(`${body.message}`);
            } else {
                message.error('Ошибка входа');
            }
        },
    })
}


export interface SignUpFormValues {
    [CODE.LOGIN]?: string
    [CODE.PASSWORD]?: string
    [CODE.USERNAME]?: string
}

/*export type SignUpRequest = {
    login: string;
    password: string;
    username: string;
}*/


export type SignUpResponse = {
    message: string;
}

/*async function signUpRequest(data: SignUpFormValues): Promise<SignUpResponse> {
    return api.post(URL.SIGN_UP, {
        json: data,
    }).json<SignUpResponse>()
}*/

const signUpRequest = async (data: SignUpFormValues) => {
    return api.post(URL.SIGN_UP, {
        json: data,
    }).json<SignUpResponse>()
}

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: signUpRequest
    })
}
