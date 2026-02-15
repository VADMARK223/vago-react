import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { HomePage } from '../features/home/HomePage';
import { SignInPage } from '../features/auth/SignInPage';
import { NotFoundPage } from './NotFoundPage';
import { route } from './route';
import { QuestionPage } from '../features/questions/QuestionPage';
import { SignUpPage } from '../features/auth/SignUpPage';
import { ROUTE } from '@/shared/constants';
import { TasksPage } from '../features/tasks/TasksPage';
import { lazy, Suspense } from 'react';
import { adminLazy } from '../features/admin/admin.lazy';
import { ChatPage } from '../features/chat/ChatPage';
import { AuthRoute } from '../features/auth/AuthRoute';
import { SettingsPage } from '../features/settings/SettingsPage';
import { TestRandomRedirectPage } from '../features/test/TestRandomRedirectPage';
import { TestPage } from '../features/test/TestPage';

const BookPage = lazy(
  () =>
    import(
      /* webpackChunkName: "book" */
      '../features/book/BookPage'
    ),
);

const BookTocPage = lazy(
  () =>
    import(
      /* webpackChunkName: "book_toc" */
      '../features/book/BookTocPage'
    ),
);

const BookChapterPage = lazy(
  () =>
    import(
      /* webpackChunkName: "book_chapter" */
      '../features/book/BookChapterPage'
    ),
);

export const router = createBrowserRouter(
  [
    route({
      path: ROUTE.HOME,
      element: <AppLayout />,
      handle: { title: 'Vago' },
      children: [
        route({ index: true, element: <HomePage />, handle: { title: 'Главная' } }),
        route({ path: ROUTE.SIGN_IN, element: <SignInPage />, handle: { title: 'Вход' } }),
        route({ path: ROUTE.SIGN_UP, element: <SignUpPage />, handle: { title: 'Регистрация' } }),
        route({
          path: ROUTE.BOOK,
          element: (
            <Suspense fallback={<div>Загрузка книги...</div>}>
              <BookPage />
            </Suspense>
          ),
          handle: { title: 'Книга' },
          children: [
            route({
              index: true,
              element: (
                <Suspense fallback={<div>Загрузка оглавления...</div>}>
                  <BookTocPage />
                </Suspense>
              ),
              handle: { title: 'Книга (React / TS / JS)' },
            }),
            route({
              path: ':chapterId',
              element: (
                <Suspense fallback={<div>Загрузка главы...</div>}>
                  <BookChapterPage />
                </Suspense>
              ),
              handle: { title: 'Chapter' },
            }),
          ],
        }),
        route({
          path: ROUTE.TEST,
          element: <TestRandomRedirectPage />,
          handle: { title: 'Получение вопросы' },
        }),
        route({
          path: ROUTE.TEST + '/:id',
          element: <TestPage />,
          handle: { title: 'Тест (Go)' },
        }),
        route({
          path: ROUTE.QUESTIONS,
          element: <QuestionPage />,
          handle: { title: 'Вопросы (Go)' },
        }),
        route({
          path: ROUTE.TASKS,
          element: (
            <AuthRoute>
              <TasksPage />
            </AuthRoute>
          ),
          handle: { title: 'Задачи' },
        }),
        route({
          path: ROUTE.CHAT,
          element: (
            <AuthRoute>
              <ChatPage />
            </AuthRoute>
          ),
          handle: { title: 'Чат' },
        }),
        route({
          path: ROUTE.SETTINGS,
          element: (
            <AuthRoute>
              <SettingsPage />
            </AuthRoute>
          ),
          handle: { title: 'Настройки' },
        }),

        route({
          path: ROUTE.ADMIN,
          lazy: adminLazy,
        }),
        route({ path: '*', element: <NotFoundPage />, handle: { title: 'Страница не найдена' } }),
      ],
    }),
  ],
  { basename: '/v2' },
);
