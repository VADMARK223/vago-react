import type { User } from '@/features/auth/auth';
import { Typography } from 'antd';
import { SignOutButton } from '@/features/auth/user-menu/SignOutButton';
import { SignUpButton } from '@/shared/ui/SignUpButton';
import { SignInButton } from '@/shared/ui/SignInButton';
import { useLocation } from 'react-router-dom';
import { ROUTE } from '@/shared/constants';
import { VStack } from '@/shared/ui/v-stack/VStack';

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
      <VStack>
        <div>
          Привет, <b>{me.username}</b>!
          {me.role && (
            <div>
              <Typography.Text type="secondary">Роль: {me.role}</Typography.Text>
            </div>
          )}
        </div>

        <SignOutButton isCompact={false} onDone={onRequestClose} />
      </VStack>
    );
  }

  return (
    <VStack>
      <div>
        Привет!
        <div>
          <Typography.Text type="secondary">Ты сейчас гость</Typography.Text>
        </div>
      </div>

      {!isOnSignInPage && (
        <SignInButton isCompact={isCompact} isMeLoading={isMeLoading} onClick={onRequestClose} />
      )}
      {!isOnSignUpPage && <SignUpButton onClick={onRequestClose} />}
    </VStack>
  );
}
