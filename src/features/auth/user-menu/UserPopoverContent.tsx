import type { User } from '@/features/auth/auth.ts';
import { Space, Typography } from 'antd';
import { SignOutButton } from '@/features/auth/user-menu/SignOutButton.tsx';
import { SignUpButton } from '@/features/auth/user-menu/SignUpButton.tsx';
import { SignInButton } from '@/features/auth/user-menu/SignInButton.tsx';

type Props = {
  me: User | undefined;
  isCompact: boolean;
  isMeLoading: boolean;
  isOnSignInPage: boolean;
  isOnSignUpPage: boolean;
  onRequestClose: () => void;
};

export function UserPopoverContent({
  me,
  isCompact,
  isMeLoading,
  isOnSignInPage,
  isOnSignUpPage,
  onRequestClose,
}: Props) {
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
