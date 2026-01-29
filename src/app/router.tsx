import {createBrowserRouter} from "react-router-dom"
import {AppLayout} from "./AppLayout.tsx";
import {HomePage} from "../features/home/HomePage.tsx";
import {LoginPage} from "../features/auth/LoginPage.tsx";
import {BookPage} from "../features/book/BookPage.tsx";
import {NotFoundPage} from "./NotFoundPage.tsx";
import {route} from "./route";
import {TestPage} from "../features/test/TestPage.tsx";
import {AdminPage} from "../features/admin/AdminPage.tsx";
import {ProtectedRoute} from "../features/auth/ProtectedRoute.tsx";

export const router = createBrowserRouter(
    [
        route({
            path: '/',
            element: <AppLayout/>,
            handle: {title: "Vago"},
            children: [
                route({index: true, element: <HomePage/>, handle: {title: "Главная"}}),
                route({path: "test", element: <TestPage/>, handle: {title: "Test"}}),
                route({path: "login", element: <LoginPage/>, handle: {title: "Вход"}}),
                route({path: "book", element: <BookPage/>, handle: {title: "Книга"}}),

                route({
                    path: "admin",
                    element: (<ProtectedRoute><AdminPage/></ProtectedRoute>),
                    handle: {title: "Админка"}
                }),
                route({path: "*", element: <NotFoundPage/>, handle: {title: "Страница не найдена"}}),
            ]
        }),
    ],
    {basename: "/v2"}
)