import type {JSX} from 'react'
import {type AuthRedirectState, useAuth} from './auth.ts'
import {Navigate, useLocation} from 'react-router-dom'
import {ROUTE} from '../../constants/routes.ts'

export function AuthRoute({children}: { children: JSX.Element }) {
    const {isAuthed, isLoading} = useAuth()

    const location = useLocation()

    if (isLoading) {
        return null
    }

    if (!isAuthed) {
        const state: AuthRedirectState = {
            from: {pathname: location.pathname},
        }

        console.log("REDIRECT")
        return <Navigate to={ROUTE.SIGN_IN} replace state={state}/>
    }

    return children
}
