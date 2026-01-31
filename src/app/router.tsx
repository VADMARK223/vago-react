import {createBrowserRouter} from "react-router-dom"
import {AppLayout} from "./AppLayout.tsx";
import {HomePage} from "../features/home/HomePage.tsx";
import {SignInPage} from "../features/auth/SignInPage.tsx";
import {BookPage} from "../features/book/BookPage.tsx";
import {NotFoundPage} from "./NotFoundPage.tsx";
import {route} from "./route";
import {TestPage} from "../features/test/TestPage.tsx";
import {AdminPage} from "../features/admin/AdminPage.tsx";
import {ProtectedRoute} from "../features/auth/ProtectedRoute.tsx";
import {SignUpPage} from "../features/auth/SignUpPage.tsx";
import {ROUTES} from "../constants/routes.ts";

export const router = createBrowserRouter(
    [
        route({
            path: '/',
            element: <AppLayout/>,
            handle: {title: "Vago"},
            children: [
                route({index: true, element: <HomePage/>, handle: {title: "Главная"}}),
                route({path: "test", element: <TestPage/>, handle: {title: "Test"}}),
                route({path: ROUTES.SIGN_IN, element: <SignInPage/>, handle: {title: "Вход"}}),
                route({path: ROUTES.SIGN_UP, element: <SignUpPage/>, handle: {title: "Регистрация"}}),
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