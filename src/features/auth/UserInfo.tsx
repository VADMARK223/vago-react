import { GuestColor, type HexColor, useMe, useSignInRedirect } from './auth.ts';
import { Avatar, Button, Space, Tooltip } from 'antd';
import { useLocation } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { SignOutButton } from './SignOutButton.tsx';
import { MUTATION_KEY, ROUTE } from '@/shared/constants';
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

  const avatarLetter = me?.username?.trim().charAt(0).toUpperCase() ?? 'Г';
  const tooltipTitle = me?.username ? me.username : 'Гость';
  const avatarBg: HexColor | undefined = me ? me.color : GuestColor;

  return (
    <Space orientation="horizontal">
      <Tooltip title={`Привет, ${tooltipTitle}!`} placement="bottom">
        <Avatar
          style={{
            background: avatarBg,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {avatarLetter}
        </Avatar>
      </Tooltip>

      {me ? (
        <>
          <SignOutButton iconOnly={isPhone} />
        </>
      ) : (
        <>
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
