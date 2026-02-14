import { useDeleteUser } from '../admin.ts';
import type { JSX } from 'react';
import type { Id } from '@/shared/types.ts';
import { DeleteButton } from '@/shared/ui/DeleteButton.tsx';

interface Props {
  id: Id;
}

export function DeleteUserBtn({ id }: Props): JSX.Element {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  return <DeleteButton onClick={() => deleteUser(id)} loading={isPending} />;
}
