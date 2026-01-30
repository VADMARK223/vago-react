import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "../../shared/api/kyClient.ts";
import {message} from "antd";
import {HTTPError} from "ky";

export type UserData = {
    id: number;
    username: string;
}

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => api.get("me").json<UserData>(),
        retry: false,
    });
}

export type LoginRequest = {
    login: string;
    password: string;
}

type LoginResponse = {
    message: string;
}

async function loginRequest(data: LoginRequest): Promise<LoginResponse> {
    return api.post("login", {
        json: data,
    }).json<LoginResponse>()
}

export const useLoginMutation = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: loginRequest,
        onSuccess: async (data: LoginResponse) => {
            await qc.invalidateQueries({queryKey: ["me"]})
            message.success(`${data.message}`)
        },
        onError: async (error) => {
            if (error instanceof HTTPError) {
                const body = await error.response.json<LoginResponse>();
                message.error(`${body.message}`);
            } else {
                message.error("Ошибка входа");
            }
        },
    })
}