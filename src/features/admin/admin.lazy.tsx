import type {RouteObject} from 'react-router-dom'
// import {AdminPage} from './AdminPage.tsx'
import {ProtectedRoute} from '../auth/ProtectedRoute.tsx'

export async function adminLazy(): Promise<Pick<RouteObject, 'element' | 'handle'>> {
    const mod = await import('./AdminPage.tsx')
    const AdminPage = mod.default

    return {
        element: (
            <ProtectedRoute>
                <AdminPage/>
            </ProtectedRoute>
        ),
        handle: {title: 'Админка'}
    }
}
