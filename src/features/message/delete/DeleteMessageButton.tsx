import type { Id } from '@/shared/types';
import { type ComponentProps, type JSX } from 'react';
import { DeleteButton } from '@/shared/ui/DeleteButton';
import { Button, Tooltip } from 'antd';
import { useDeleteMessage } from '@/features/message/delete/use-delete-message';

interface Props {
  id: Id;
  size?: ComponentProps<typeof Button>['size'];
}

export const DeleteMessageButton = ({ id, size = 'middle' }: Props): JSX.Element => {
  const { mutate: deleteMessage } = useDeleteMessage();

  return (
    <Tooltip title={`Удалить сообщение: ${id} `} placement="top">
      <span style={{ display: 'inline-block' }}>
        <DeleteButton size={size} onClick={() => deleteMessage(id)} />
      </span>
    </Tooltip>
  );
};
