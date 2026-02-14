import { DeleteOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';
import { useDeleteUser } from '../admin.ts';
import type { JSX } from 'react';
import { getKyErrorMessage } from '@/shared/api/ky-client.ts';
import type { Id } from '@/shared/types.ts';

interface Props {
  id: Id;
}

export function DeleteUserBtn({ id }: Props): JSX.Element {
  const { message } = App.useApp();
  const { mutate: deleteUser, isPending } = useDeleteUser();

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
            message.error(errorMsg ?? 'Ошибка удаления пользователя');
          },
        });
      }}
      danger
      loading={isPending}
      size="large"
      icon={<DeleteOutlined />}
    />
  );
}
