import ky, {HTTPError} from 'ky';

export type KyResponse = {
    message: string;
}

export const api = ky.create({
    prefixUrl: "/api",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getKyErrorMessage(error: unknown): Promise<string | null> {
    if (!(error instanceof HTTPError)) return null;

    try {
        const body = await error.response.json<KyResponse>();
        return body?.message ?? null;
    } catch {
        return null;
    }
}