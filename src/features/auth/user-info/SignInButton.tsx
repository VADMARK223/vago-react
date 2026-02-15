import { LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useCallback } from 'react';
import { useSignInRedirect } from '@/features/auth/auth.ts';
import { useLocation } from 'react-router-dom';
import { useIsMutating } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants';

type Props = {
  isCompact?: boolean;
  isLoading: boolean;
};

export const SignInButton = ({ isCompact, isLoading }: Props) => {
  const mutatingCount = useIsMutating({ mutationKey: MUTATION_KEY.SIGN_IN });
  const isSigningIn = mutatingCount > 0;
  const { pathname } = useLocation();
  const goSignIn = useSignInRedirect();

  const isBlocked = isSigningIn || isLoading;

  const handleSignIn = useCallback(() => {
    goSignIn(pathname);
  }, [goSignIn, pathname]);

  return (
    <Button
      icon={<LoginOutlined />}
      onClick={handleSignIn}
      loading={isBlocked}
      disabled={isBlocked}
    >
      {!isCompact && 'Войти'}
    </Button>
  );
};
