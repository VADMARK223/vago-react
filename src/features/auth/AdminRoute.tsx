import {Navigate, useLocation} from 'react-router-dom'
import {type AuthRedirectState, useAuth} from './auth.ts'
import type {JSX} from 'react'
import {ROUTE} from '../../constants/routes.ts'

export function AdminRoute({children}: { children: JSX.Element }) {
    const {isAuthed, isAdmin, isLoading} = useAuth()

    const location = useLocation()

    if (isLoading) {
        return null
    }

    if (!isAuthed) {
        const state: AuthRedirectState = {
            from: {pathname: location.pathname},
        }

        return <Navigate to={ROUTE.SIGN_IN} replace state={state}/>
    } else if (!isAdmin) {
        return <Navigate to={ROUTE.HOME}/>
    }


    return children
}
