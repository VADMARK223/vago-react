import { Navigate, useLocation } from 'react-router-dom';
import { type AuthRedirectState, useAuth } from './auth';
import type { JSX } from 'react';
import { ROUTE } from '@/shared/constants';

export function AdminRoute({ children }: { children: JSX.Element }) {
  const { isAuthed, isAdminModerator, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthed) {
    const state: AuthRedirectState = {
      from: { pathname: location.pathname },
    };

    return <Navigate to={ROUTE.SIGN_IN} replace state={state} />;
  } else if (!isAdminModerator) {
    return <Navigate to={ROUTE.HOME} />;
  }

  return children;
}
