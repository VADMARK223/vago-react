import { useMe, useSignInRedirect } from './auth.ts';
import { Button, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { SignOutButton } from './SignOutButton.tsx';
import { ROUTE, MUTATION_KEY } from '@/shared/constants';
import { useIsMutating } from '@tanstack/react-query';
import { useCallback } from 'react';

interface Props {
  isPhone?: boolean;
}

export function UserInfo({ isPhone }: Props) {
  const { data: me, isLoading } = useMe();
  const mutatingCount = useIsMutating({ mutationKey: MUTATION_KEY.SIGN_IN });
  const isSigningIn = mutatingCount > 0;

  const { pathname } = useLocation();
  const goSignIn = useSignInRedirect();

  const handleSignIn = useCallback(() => {
    goSignIn(pathname);
  }, [goSignIn, pathname]);

  const isOnSignInPage = pathname === ROUTE.SIGN_IN;

  return (
    <Space orientation="horizontal">
      {me ? (
        <>
          {!isPhone && <span>Привет, {me.username}!</span>}
          <SignOutButton iconOnly={isPhone} />
        </>
      ) : (
        <>
          {!isPhone && <span>Привет, Гость!</span>}

          {!isOnSignInPage && (
            <Button
              icon={<LoginOutlined />}
              onClick={handleSignIn}
              loading={isSigningIn || isLoading}
              disabled={isSigningIn || isLoading}
            >
              {!isPhone && 'Войти'}
            </Button>
          )}
        </>
      )}
    </Space>
  );
}
