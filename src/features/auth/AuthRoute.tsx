import type { JSX } from 'react';
import { type AuthRedirectState, useAuth } from './auth';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTE } from '@/shared/constants';

export function AuthRoute({ children }: { children: JSX.Element }) {
  const { isAuthed, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthed) {
    const state: AuthRedirectState = {
      from: { pathname: location.pathname },
    };

    return <Navigate to={ROUTE.SIGN_IN} replace state={state} />;
  }

  return children;
}
