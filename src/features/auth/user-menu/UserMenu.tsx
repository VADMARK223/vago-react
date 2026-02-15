import { GuestColor, type HexColor, useMe } from '../auth.ts';
import { Avatar, Popover, Space, Tooltip } from 'antd';
import { useLocation } from 'react-router-dom';
import { ROUTE } from '@/shared/constants';
import { useState } from 'react';
import { UserPopoverContent } from '@/features/auth/user-menu/UserPopoverContent.tsx';
import { SignInButton } from '@/features/auth/user-menu/SignInButton.tsx';
import { SignUpButton } from '@/features/auth/user-menu/SignUpButton.tsx';

interface Props {
  isCompact?: boolean;
}

export function UserMenu({ isCompact }: Props) {
  const { data: me, isLoading: isMeLoading } = useMe();
  const { pathname } = useLocation();

  const isOnSignInPage = pathname === ROUTE.SIGN_IN;
  const isOnSignUpPage = pathname === ROUTE.SIGN_UP;

  const showSignIn = !me && !isOnSignInPage;
  const showSignUp = !me && !isOnSignUpPage;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const avatarLetter = me?.username?.trim().charAt(0).toUpperCase() || 'Г';

  const avatarBg: HexColor = (me?.color ?? GuestColor) as HexColor;

  return (
    <Space>
      {showSignIn && <SignInButton isCompact={isCompact} isMeLoading={isMeLoading} />}
      {showSignUp && <SignUpButton />}

      <Popover
        content={
          <UserPopoverContent
            me={me}
            isCompact={!!isCompact}
            isMeLoading={isMeLoading}
            isOnSignInPage={isOnSignInPage}
            isOnSignUpPage={isOnSignUpPage}
            onRequestClose={() => setIsPopoverOpen(false)}
          />
        }
        trigger="click"
        placement="bottomRight"
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <Tooltip
          title="Открыть меню навигации пользователя"
          open={isPopoverOpen ? false : undefined}
        >
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
      </Popover>
    </Space>
  );
}
