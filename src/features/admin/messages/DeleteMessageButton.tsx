import type { Id } from '@/shared/types';
import * as React from 'react';
import { type JSX } from 'react';
import { useDeleteMessage } from '@/features/admin/admin';
import { DeleteButton } from '@/shared/ui/DeleteButton';
import { Button, Tooltip } from 'antd';

interface Props {
  id: Id;
  removeFromPending?: (id: number) => void;
  size?: React.ComponentProps<typeof Button>['size'];
}

export const DeleteMessageButton = ({
  id,
  removeFromPending,
  size = 'middle',
}: Props): JSX.Element => {
  const { mutate: deleteMessage, isPending } = useDeleteMessage();

  return (
    <Tooltip title={`Удалить сообщение: ${id} `} placement="top">
      <span style={{ display: 'inline-block' }}>
        <DeleteButton
          onClick={() => {
            deleteMessage(id);
            removeFromPending?.(id);
          }}
          loading={isPending}
          size={size}
        />
      </span>
    </Tooltip>
  );
};
