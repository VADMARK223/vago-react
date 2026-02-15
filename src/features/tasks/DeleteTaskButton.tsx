import { App, Button } from 'antd';
import { getKyErrorMessage } from '@/shared/api/ky-client';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteTask } from './tasks';
import type { Id } from '@/shared/types';

interface Props {
  id: Id;
}

export function DeleteTaskButton({ id }: Props) {
  const { message } = App.useApp();
  const { mutate: deleteTask, isPending } = useDeleteTask();

  return (
    <Button
      type="primary"
      onClick={() => {
        deleteTask(id, {
          onError: async (err) => {
            const errorMsg = await getKyErrorMessage(err);
            message.error(errorMsg);
          },
        });
      }}
      danger
      loading={isPending}
      size="middle"
      icon={<DeleteOutlined />}
    />
  );
}
