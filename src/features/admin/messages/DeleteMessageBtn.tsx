import type { Id } from '@/shared/types.ts';
import type { JSX } from 'react';
import { useDeleteMessage } from '@/features/admin/admin.ts';
import { DeleteButton } from '@/shared/ui/DeleteButton.tsx';

interface Props {
  id: Id;
}

export const DeleteMessageBtn = ({ id }: Props): JSX.Element => {
  const { mutate: deleteMessage, isPending } = useDeleteMessage();

  return <DeleteButton onClick={() => deleteMessage(id)} loading={isPending} />;
};
