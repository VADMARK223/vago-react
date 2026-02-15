import type { JSX } from 'react';
import { type AuthRedirectState, useAuth } from './auth.ts';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTE } from '@/shared/constants';

export function AuthRoute({ children }: { children: JSX.Element }) {
  const { isAuthed, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return null;
  }

  console.log('AuthRoute isAuthed', isAuthed);
  if (!isAuthed) {
    const state: AuthRedirectState = {
      from: { pathname: location.pathname },
    };

    console.log('AuthRoute navigate to', state);
    return <Navigate to={ROUTE.SIGN_IN} replace state={state} />;
  }

  return children;
}
