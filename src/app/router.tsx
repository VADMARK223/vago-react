import {createBrowserRouter} from 'react-router-dom'
import {AppLayout} from './AppLayout.tsx'
import {HomePage} from '../features/home/HomePage.tsx'
import {SignInPage} from '../features/auth/SignInPage.tsx'
import {NotFoundPage} from './NotFoundPage.tsx'
import {route} from './route'
import {TestPage} from '../features/test/TestPage.tsx'
// import {AdminPage} from '../features/admin/AdminPage.tsx'
// import {ProtectedRoute} from '../features/auth/ProtectedRoute.tsx'
import {SignUpPage} from '../features/auth/SignUpPage.tsx'
import {ROUTE} from '../constants/routes.ts'
import {TasksPage} from '../features/tasks/TasksPage.tsx'
import {lazy, Suspense} from 'react'
import {adminLazy} from '../features/admin/admin.lazy.tsx'

const BookPage = lazy(() => import(
    /* webpackChunkName: "book" */
    '../features/book/BookPage.tsx'
    ))

const BookTocPage = lazy(() => import(
    /* webpackChunkName: "book_toc" */
    '../features/book/BookTocPage.tsx'
    ))

const BookChapterPage = lazy(() => import(
    /* webpackChunkName: "book_chapter" */
    '../features/book/BookChapterPage.tsx'
    ))

export const router = createBrowserRouter(
    [
        route({
            path: ROUTE.HOME,
            element: <AppLayout/>,
            handle: {title: 'Vago'},
            children: [
                route({index: true, element: <HomePage/>, handle: {title: 'Главная'}}),
                route({path: 'test', element: <TestPage/>, handle: {title: 'Test'}}),
                route({path: ROUTE.SIGN_IN, element: <SignInPage/>, handle: {title: 'Вход'}}),
                route({path: ROUTE.SIGN_UP, element: <SignUpPage/>, handle: {title: 'Регистрация'}}),
                route({
                    path: ROUTE.BOOK,
                    element: (
                        <Suspense fallback={<div>Загрузка книги...</div>}>
                            <BookPage/>
                        </Suspense>
                    ),
                    handle: {title: 'Книга'},
                    children: [
                        route({
                            index: true, element: (
                                <Suspense fallback={<div>Загрузка оглавления...</div>}>
                                    <BookTocPage/>
                                </Suspense>
                            ), handle: {title: 'Книга (TS / React)'}
                        }),
                        route({
                            path: ':chapterId', element: (
                                <Suspense fallback={<div>Загрузка главы...</div>}>
                                    <BookChapterPage/>
                                </Suspense>
                            ), handle: {title: 'Chapter'}
                        }),
                    ]
                }),
                route({path: ROUTE.TASKS, element: <TasksPage/>, handle: {title: 'Задачи'}}),

                route({
                    path: ROUTE.ADMIN,
                    lazy: adminLazy
                    /*element: (
                        <ProtectedRoute>
                            <AdminPage/>
                        </ProtectedRoute>),
                    handle: {title: 'Админка'}*/
                }),
                route({path: '*', element: <NotFoundPage/>, handle: {title: 'Страница не найдена'}}),
            ]
        }),
    ],
    {basename: '/v2'}
)