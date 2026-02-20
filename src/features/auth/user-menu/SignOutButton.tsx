import { App, Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CODE, QUERY_KEY, ROUTE } from '@/shared/constants';
import { api } from '@/shared/api/ky-client';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

type Props = {
  isCompact?: boolean;
  onDone?: () => void;
};

export function SignOutButton({ isCompact, onDone }: Props) {
  const { message } = App.useApp();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const finish = (text: string) => {
    navigate(ROUTE.SIGN_IN, { replace: true, state: { justLoggedOut: true } });
    message.info(text).then();
  };

  const signOut = useMutation({
    mutationFn: async () => {
      await api.get(CODE.SIGN_OUT); // TODO: поменять на POST, потому что меняет состояние на сервере
    },
    onMutate: async () => {
      onDone?.();
      await qc.cancelQueries({ queryKey: [QUERY_KEY.me] });
      qc.setQueryData([QUERY_KEY.me], null);
    },
    onError: () => finish('Вы вышли (локально).'),
  });

  return (
    <Button
      icon={<LogOut size={16} />}
      loading={signOut.isPending}
      onClick={() => signOut.mutate()}
    >
      {!isCompact && 'Выйти'}
    </Button>
  );
}
