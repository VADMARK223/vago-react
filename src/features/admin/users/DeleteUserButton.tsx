import { useDeleteUser } from '../admin';
import type { JSX } from 'react';
import type { Id } from '@/shared/types';
import { DeleteButton } from '@/shared/ui/DeleteButton';
import { Tooltip } from 'antd';

interface Props {
  id: Id;
}

export function DeleteUserButton({ id }: Props): JSX.Element {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  return (
    <Tooltip title={`Удалить пользователя: ${id} `} placement="top">
      <span style={{ display: 'inline-block' }}>
        <DeleteButton onClick={() => deleteUser(id)} loading={isPending} size="large" />
      </span>
    </Tooltip>
  );
}
