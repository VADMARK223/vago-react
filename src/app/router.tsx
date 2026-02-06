import {createBrowserRouter} from 'react-router-dom'
import {AppLayout} from './AppLayout.tsx'
import {HomePage} from '../features/home/HomePage.tsx'
import {SignInPage} from '../features/auth/SignInPage.tsx'
import {NotFoundPage} from './NotFoundPage.tsx'
import {route} from './route'
import {TestPage} from '../features/test/TestPage.tsx'
import {QuestionPage} from '../features/questions/QuestionPage.tsx'
import {SignUpPage} from '../features/auth/SignUpPage.tsx'
import {ROUTE} from '../constants/routes.ts'
import {TasksPage} from '../features/tasks/TasksPage.tsx'
import {lazy, Suspense} from 'react'
import {adminLazy} from '../features/admin/admin.lazy.tsx'
import {ChatPage} from '../features/chat/ChatPage.tsx'
import {AuthRoute} from '../features/auth/AuthRoute.tsx'

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
                route({path: ROUTE.TEST, element: <TestPage/>, handle: {title: 'Тест (Go)'}}),
                route({path: ROUTE.QUESTIONS, element: <QuestionPage/>, handle: {title: 'Вопросы (Go)'}}),
                route({
                    path: ROUTE.TASKS,
                    element: (
                        <AuthRoute>
                            <TasksPage/>
                        </AuthRoute>),
                    handle: {title: 'Задачи'}
                }),
                route({
                    path: ROUTE.CHAT,
                    element: (
                        <AuthRoute>
                            <ChatPage/>
                        </AuthRoute>
                    ),
                    handle: {title: 'Чат'}
                }),

                route({
                    path: ROUTE.ADMIN,
                    lazy: adminLazy
                }),
                route({path: '*', element: <NotFoundPage/>, handle: {title: 'Страница не найдена'}}),
            ]
        }),
    ],
    {basename: '/v2'}
)