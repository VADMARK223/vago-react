import {useQuery} from "@tanstack/react-query";
import {api} from "../api/kyClient.ts";

type TestResponse = {
    id: number;
    message: string;
};

// const mutation = useMutation({
//   mutationFn: (body: LoginDto) =>
//     api.post("auth/login", { json: body }).json<User>(),
// });

export function TestPage() {
    const {data, isLoading, error} = useQuery({
        queryKey: ["vadmark", 9],
        queryFn: () => api.get("vadmark/9").json<TestResponse>(),
    });

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка</div>;

    return <div>{data?.message}</div>;
}