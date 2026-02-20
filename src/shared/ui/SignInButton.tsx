import { Button } from 'antd';
import { useSignInRedirect } from '@/features/auth/auth';
import { useLocation } from 'react-router-dom';
import { useIsMutating } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants';
import { LucideIcon } from '@/shared/ui/LucideIcon';
import { LogIn } from 'lucide-react';

type Props = {
  isCompact?: boolean;
  isMeLoading: boolean;
  onClick?: () => void;
};

export const SignInButton = ({ isCompact, isMeLoading, onClick }: Props) => {
  const mutatingCount = useIsMutating({ mutationKey: MUTATION_KEY.SIGN_IN });
  const isSigningIn = mutatingCount > 0;

  const { pathname } = useLocation();
  const goSignIn = useSignInRedirect();

  const isBlocked = isSigningIn || isMeLoading;

  const handleClick = () => {
    onClick?.();
    goSignIn(pathname);
  };

  return (
    <Button
      icon={<LucideIcon icon={LogIn} />}
      onClick={handleClick}
      loading={isBlocked}
      disabled={isBlocked}
    >
      {!isCompact && 'Войти'}
    </Button>
  );
};
