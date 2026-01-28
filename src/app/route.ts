import type {RouteObject} from "react-router-dom";

export type RouteHandler = {
    title: string;
}

type AppRoute = RouteObject & {
    handler?: RouteHandler
    children?: AppRoute[]
}

export function route(r: AppRoute): AppRoute {
    return r
}
