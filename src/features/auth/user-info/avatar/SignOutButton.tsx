import { App, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CODE, QUERY_KEY, ROUTE } from '@/shared/constants';
import { api } from '@/shared/api/ky-client.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
  isCompact?: boolean;
}

export function SignOutButton({ isCompact }: Props) {
  const { message } = App.useApp();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const signOut = useMutation({
    mutationFn: async () => {
      await api.get(CODE.SIGN_OUT); // TODO: поменять на POST, потому что меняет состояние на сервере
    },
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: [QUERY_KEY.ME] });
      qc.setQueryData([QUERY_KEY.ME], null);
      qc.removeQueries({ queryKey: [QUERY_KEY.ME] });
    },
    onSuccess: () => {
      navigate(ROUTE.SIGN_IN, { replace: true, state: { justLoggedOut: true } });
    },
    onError: () => {
      // даже если сервер упал — локально считаем, что вышли
      message.info('Вы вышли (локально).').then();
      navigate(ROUTE.SIGN_IN, { replace: true, state: { justLoggedOut: true } });
    },
  });

  return (
    <Button icon={<LogoutOutlined />} loading={signOut.isPending} onClick={() => signOut.mutate()}>
      {!isCompact && 'Выйти'}
    </Button>
  );
}
