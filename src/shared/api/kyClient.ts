import ky, {HTTPError} from 'ky'

export type KyResponse<T = undefined> = { message: string } & (T extends undefined ? object : { data: T })

export const api = ky.create({
    prefixUrl: '/api',
    credentials: 'include',
    hooks: {
        afterResponse: [
            async (_req, _opt, res) => {
                if (res.status === 401) {
                    console.log('превращаемся в "гостя"')
                    // queryClient.setQueryData([QUERY_KEY.ME], null)
                }
            }
        ]
    },
    retry: {
        limit: 0
    },
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function getKyErrorMessage(error: unknown): Promise<string | null> {
    if (!(error instanceof HTTPError)) return null

    try {
        const body = await error.response.json<KyResponse>()
        return body?.message ?? null
    } catch {
        return null
    }
}