import {createBrowserRouter} from 'react-router-dom'
import {AppLayout} from './AppLayout.tsx'
import {HomePage} from '../features/home/HomePage.tsx'
import {SignInPage} from '../features/auth/SignInPage.tsx'
import {BookPage} from '../features/book/BookPage.tsx'
import {NotFoundPage} from './NotFoundPage.tsx'
import {route} from './route'
import {TestPage} from '../features/test/TestPage.tsx'
import {AdminPage} from '../features/admin/AdminPage.tsx'
import {ProtectedRoute} from '../features/auth/ProtectedRoute.tsx'
import {SignUpPage} from '../features/auth/SignUpPage.tsx'
import {ROUTE} from '../constants/routes.ts'
import {TasksPage} from '../features/tasks/TasksPage.tsx'
import {BookTocPage} from '../features/book/BookTocPage.tsx'
import {BookChapterPage} from '../features/book/BookChapterPage.tsx'

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
                    element: <BookPage/>,
                    handle: {title: 'Книга'},
                    children: [
                        route({index: true, element: <BookTocPage/>, handle: {title: 'Оглавление'}}),
                        route({path: ':chapterId', element: <BookChapterPage/>, handle: {title: 'Chapter'}}),
                    ]
                }),
                route({path: ROUTE.TASKS, element: <TasksPage/>, handle: {title: 'Задачи'}}),

                route({
                    path: ROUTE.ADMIN,
                    element: (<ProtectedRoute><AdminPage/></ProtectedRoute>),
                    handle: {title: 'Админка'}
                }),
                route({path: '*', element: <NotFoundPage/>, handle: {title: 'Страница не найдена'}}),
            ]
        }),
    ],
    {basename: '/v2'}
)