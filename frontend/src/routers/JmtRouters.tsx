import { RouteObject } from "react-router-dom";
import LoginView from "../ui/LoginContainer"
import MainView from "../ui/MainContainer"

export const JmtRouters: RouteObject[] = [
    {
        path: "/",
        element: <LoginView />
    },
    {
        path: "/MainView",
        element: <MainView />
    }
];
