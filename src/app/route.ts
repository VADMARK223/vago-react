import type { RouteObject } from 'react-router-dom';

export type RouteHandle = {
  title: string;
};

type AppRoute = RouteObject & {
  handle?: RouteHandle;
  children?: AppRoute[];
};

export function route(r: AppRoute): AppRoute {
  return r;
}
