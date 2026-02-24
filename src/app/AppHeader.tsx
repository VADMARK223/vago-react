import { Button, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useLocation, useMatches } from 'react-router-dom';
import { useMemo } from 'react';
import type { RouteHandle } from './route';
import { UserMenu } from '@/features/auth/user-menu/UserMenu';
import { GoButton } from './GoButton';
import { useAppUi } from '@/shared/ui/useAppUi';
import { SignInButton } from '@/shared/ui/SignInButton';
import { SignUpButton } from '@/shared/ui/SignUpButton';
import { useMe } from '@/features/auth/auth';
import { ROUTE } from '@/shared/constants';
import { HStack } from '@/shared/ui/h-stack/HStack';

type AppHeaderProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export function AppHeader({ collapsed, onToggleCollapse }: AppHeaderProps) {
  const { data: me, isLoading: isMeLoading } = useMe();
  const { isPhone: isCompact } = useAppUi();
  const { pathname } = useLocation();
  const matches = useMatches();

  const isOnSignInPage = pathname === ROUTE.SIGN_IN;
  const isOnSignUpPage = pathname === ROUTE.SIGN_UP;

  const showSignIn = !me && !isOnSignInPage;
  const showSignUp = !me && !isOnSignUpPage;

  const headerTitle = useMemo(() => {
    for (let i = matches.length - 1; i >= 0; i--) {
      const handle = matches[i].handle as RouteHandle | undefined;
      if (handle?.title) {
        return handle.title;
      }
    }

    return 'Vago';
  }, [matches]);

  return (
    <Header className="header">
      <HStack>
        <Button
          type="text"
          onClick={() => onToggleCollapse()}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <Typography.Text strong>{headerTitle}</Typography.Text>
      </HStack>

      <HStack>
        {showSignIn && <SignInButton isCompact={isCompact} isMeLoading={isMeLoading} />}
        {showSignUp && <SignUpButton />}
        <GoButton isCompact={isCompact} />
        <UserMenu me={me} isMeLoading={isMeLoading} isCompact={isCompact} />
      </HStack>
    </Header>
  );
}
