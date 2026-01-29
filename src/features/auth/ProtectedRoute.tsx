import {Navigate, useLocation} from "react-router-dom";
import {useMe} from "./auth.ts";
import type {JSX} from "react";

export function ProtectedRoute({children}: { children: JSX.Element }) {
    const me = useMe()
    const location = useLocation()

    if (me.isLoading) {
        return null
    }

    if (me.isError) {
        return <Navigate to={"/login"} replace state={{from: location}}/>
    }

    return children
}
