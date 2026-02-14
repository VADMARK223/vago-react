import { type ApiMessageResponse, getKyErrorMessage } from '@/shared/api/ky-client.ts';
import type { Id } from '@/shared/types.ts';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { App } from 'antd';

type DeleteFn = (id: Id) => Promise<ApiMessageResponse>;

type Options = {
  successFallback?: string;
  errorFallback: string;
};

export function useDeleteWithToast(
  mutationFn: DeleteFn,
  { successFallback = 'Удалено', errorFallback }: Options,
): Pick<UseMutationResult<ApiMessageResponse, HTTPError, Id>, 'mutate' | 'isPending'> {
  const { message } = App.useApp();

  const { mutate, isPending } = useMutation<ApiMessageResponse, HTTPError, Id>({
    mutationFn,
    onSuccess: async (res) => {
      message.success(res?.message ?? successFallback);
    },
    onError: async (err) => {
      const errorMsg = await getKyErrorMessage(err);
      message.error(errorMsg ?? errorFallback);
    },
  });

  return { mutate, isPending };
}
