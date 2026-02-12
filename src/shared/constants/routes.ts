type RouteDict = Record<string, `/${string}`>;

export const ROUTE = {
  HOME: '/',
  SIGN_IN: '/sign_in',
  SIGN_UP: '/sign_up',
  SIGN_OUT: '/sign_out',
  BOOK: '/book',
  ADMIN: '/admin',
  TASKS: '/tasks',
  CHAT: '/chat',
  SETTINGS: '/settings',
  QUESTIONS: '/questions',
  TEST: '/test',
} as const;

// TS проверяет, что объект подходит под RouteDict
// прокладка: проверка формы без участия в месте объявления, чтобы работала навигация в IDE
const _routeCheck: RouteDict = ROUTE;
void _routeCheck;

// type valueOf<T> = T[keyof T];
// export type Route = valueOf<typeof ROUTE>;

// type RouteKey = keyof typeof ROUTE;
// type Route = (typeof ROUTE)[RouteKey];
// export const route = <K extends RouteKey>(key: K) => ROUTE[key];
