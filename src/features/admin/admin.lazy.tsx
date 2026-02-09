import type { RouteObject } from 'react-router-dom';
import { AdminRoute } from '../auth/AdminRoute.tsx';

export async function adminLazy(): Promise<Pick<RouteObject, 'element' | 'handle'>> {
  const mod = await import('./AdminPage.tsx');
  const AdminPage = mod.default;

  return {
    element: (
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    ),
    handle: { title: 'Админка' },
  };
}
