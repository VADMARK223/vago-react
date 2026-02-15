import { useMe } from '../auth.ts';
import { Avatar, Popover, Space, Tooltip } from 'antd';
import { useLocation } from 'react-router-dom';
import { ROUTE } from '@/shared/constants';
import { AvatarPopoverContent } from '@/features/auth/user-info/avatar/AvatarPopoverContent.tsx';
import { SignInButton } from '@/features/auth/user-info/SignInButton.tsx';
import { useState } from 'react';
import { SignUpButton } from '@/features/auth/user-info/SignUpButton.tsx';

interface Props {
  isPhone?: boolean;
}

export function UserInfo({ isPhone }: Props) {
  const { data: me, isLoading } = useMe();
  const { pathname } = useLocation();
  const isOnSignInPage = pathname === ROUTE.SIGN_IN;
  const isOnSignUpPage = pathname === ROUTE.SIGN_UP;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Space orientation="horizontal">
      {me && (
        <Popover
          content={<AvatarPopoverContent me={me} />}
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
                background: me.color,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {me.username?.trim().charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        </Popover>
      )}
      {!me && !isOnSignInPage && <SignInButton isCompact={isPhone} isLoading={isLoading} />}
      {!me && !isOnSignUpPage && <SignUpButton />}
    </Space>
  );
}
