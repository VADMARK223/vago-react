import type { Id } from '@/shared/types.ts';
import type { JSX } from 'react';
import { App, Button } from 'antd';
import { useDeleteMessage } from '@/features/admin/admin.ts';
import { getKyErrorMessage } from '@/shared/api/ky-client.ts';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
  id: Id;
}
export const DeleteMessageBtn = ({ id }: Props): JSX.Element => {
  const { message } = App.useApp();
  const { mutate: deleteUser, isPending } = useDeleteMessage();

  return (
    <Button
      type="primary"
      onClick={() => {
        deleteUser(id, {
          onSuccess: async (response) => {
            message.success(response.message);
          },
          onError: async (err) => {
            const errorMsg = await getKyErrorMessage(err);
            message.error(errorMsg ?? 'Ошибка удаления сообщение');
          },
        });
      }}
      danger
      loading={isPending}
      size="large"
      icon={<DeleteOutlined />}
    />
  );
};
