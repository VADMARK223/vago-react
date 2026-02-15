import type { RouteObject } from 'react-router-dom';
import { AdminRoute } from '../auth/AdminRoute';

export async function adminLazy(): Promise<Pick<RouteObject, 'element' | 'handle'>> {
  const { AdminPage } = await import('./AdminPage');

  return {
    element: (
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    ),
    handle: { title: 'Админка' },
  };
}
