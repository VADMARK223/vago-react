import type { Id } from '@/shared/types';
import type { JSX } from 'react';
import { useDeleteMessage } from '@/features/admin/admin';
import { DeleteButton } from '@/shared/ui/DeleteButton';

interface Props {
  id: Id;
  removeFromPending?: (id: number) => void;
}

export const DeleteMessageButton = ({ id, removeFromPending }: Props): JSX.Element => {
  const { mutate: deleteMessage, isPending } = useDeleteMessage();

  return (
    <DeleteButton
      onClick={() => {
        deleteMessage(id);
        removeFromPending?.(id);
      }}
      loading={isPending}
    />
  );
};
