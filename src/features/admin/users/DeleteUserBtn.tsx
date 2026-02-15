import { useDeleteUser } from '../admin';
import type { JSX } from 'react';
import type { Id } from '@/shared/types';
import { DeleteButton } from '@/shared/ui/DeleteButton';

interface Props {
  id: Id;
}

export function DeleteUserBtn({ id }: Props): JSX.Element {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  return <DeleteButton onClick={() => deleteUser(id)} loading={isPending} />;
}
