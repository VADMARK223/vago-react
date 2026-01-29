import {useQuery} from "@tanstack/react-query";
import {api} from "../api/kyClient.ts";

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