import type { RouteObject } from 'react-router-dom';
import { AdminRoute } from '../auth/AdminRoute.tsx';

export async function adminLazy(): Promise<Pick<RouteObject, 'element' | 'handle'>> {
  const { AdminPage } = await import('./AdminPage.tsx');

  return {
    element: (
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    ),
    handle: { title: 'Админка' },
  };
}
