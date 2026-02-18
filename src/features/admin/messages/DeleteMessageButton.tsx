import type { Id } from '@/shared/types';
import * as React from 'react';
import { type JSX } from 'react';
import { DeleteButton } from '@/shared/ui/DeleteButton';
import { Button, Tooltip } from 'antd';

interface Props {
  id: Id;
  deleteFn: (id: number) => void;
  size?: React.ComponentProps<typeof Button>['size'];
}

export const DeleteMessageButton = ({ id, deleteFn, size = 'middle' }: Props): JSX.Element => {
  return (
    <Tooltip title={`Удалить сообщение: ${id} `} placement="top">
      <span style={{ display: 'inline-block' }}>
        <DeleteButton size={size} onClick={() => deleteFn(id)} />
      </span>
    </Tooltip>
  );
};
