import { type ApiMessageResponse, getKyErrorMessage } from '@/shared/api/ky-client.ts';
import type { Id } from '@/shared/types.ts';
import {
  type QueryKey,
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { App } from 'antd';

type DeleteFn = (id: Id) => Promise<ApiMessageResponse>;

type Options = {
  successFallback?: string;
  errorFallback: string;

  invalidateQueryKeys: QueryKey[];
};

export function useDeleteWithToast(
  mutationFn: DeleteFn,
  { successFallback = 'Успешное удаление', errorFallback, invalidateQueryKeys = [] }: Options,
): Pick<UseMutationResult<ApiMessageResponse, HTTPError, Id>, 'mutate' | 'isPending'> {
  const { message } = App.useApp();
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation<ApiMessageResponse, HTTPError, Id>({
    mutationFn,
    onSuccess: async (res) => {
      message.success(res?.message ?? successFallback);
      await Promise.all(invalidateQueryKeys.map((queryKey) => qc.invalidateQueries({ queryKey })));
    },
    onError: async (err) => {
      const errorMsg = await getKyErrorMessage(err);
      message.error(errorMsg ?? errorFallback);
    },
  });

  return { mutate, isPending };
}
