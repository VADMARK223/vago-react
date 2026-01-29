import {createBrowserRouter} from "react-router-dom"
import {AppLayout} from "./AppLayout.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {BookPage} from "../pages/BookPage.tsx";
import {NotFoundPage} from "../pages/NotFoundPage.tsx";
import {route} from "./route";
import {TestPage} from "../pages/TestPage.tsx";

export const router = createBrowserRouter(
    [
        route({
            path: '/',
            element: <AppLayout/>,
            handler: {title: "Vago"},
            children: [
                route({index: true, element: <HomePage/>, handle: {title: "Главная"}}),
                route({path: "test", element: <TestPage/>, handle: {title: "Test"}}),
                route({path: "login", element: <LoginPage/>, handle: {title: "Вход"}}),
                route({path: "book", element: <BookPage/>, handle: {title: "Книга"}}),
                route({path: "*", element: <NotFoundPage/>, handle: {title: "Страница не найдена"}}),
            ]
        }),
    ],
    {basename: "/v2"}
)