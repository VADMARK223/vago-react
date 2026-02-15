import type { User } from '@/features/auth/auth';
import { Space, Typography } from 'antd';
import { SignOutButton } from '@/features/auth/user-menu/SignOutButton';
import { SignUpButton } from '@/shared/ui/SignUpButton';
import { SignInButton } from '@/shared/ui/SignInButton';
import { useLocation } from 'react-router-dom';
import { ROUTE } from '@/shared/constants';

type Props = {
  me: User | undefined;
  isCompact: boolean;
  isMeLoading: boolean;
  onRequestClose: () => void;
};

export function UserPopoverContent({ me, isCompact, isMeLoading, onRequestClose }: Props) {
  const { pathname } = useLocation();

  const isOnSignInPage = pathname === ROUTE.SIGN_IN;
  const isOnSignUpPage = pathname === ROUTE.SIGN_UP;

  if (me) {
    return (
      <Space orientation="vertical" size={8} style={{ minWidth: 220 }}>
        <div>
          Привет, <b>{me.username}</b>!
          {me.role && (
            <div>
              <Typography.Text type="secondary">Роль: {me.role}</Typography.Text>
            </div>
          )}
        </div>

        <SignOutButton isCompact={false} onDone={onRequestClose} />
      </Space>
    );
  }

  return (
    <Space orientation="vertical" size={10} style={{ minWidth: 220 }}>
      <div>
        Привет!
        <div>
          <Typography.Text type="secondary">Ты сейчас гость</Typography.Text>
        </div>
      </div>

      <Space>
        {!isOnSignInPage && (
          <SignInButton isCompact={isCompact} isMeLoading={isMeLoading} onClick={onRequestClose} />
        )}
        {!isOnSignUpPage && <SignUpButton onClick={onRequestClose} />}
      </Space>
    </Space>
  );
}
