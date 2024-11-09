import { Login } from "../Pages/Login"
import { Main } from "../Pages/Main"
import { Register } from "../Pages/Register"
import { Clicker } from "../Pages/Clicker"
interface RouteElement {
    element: React.JSX.Element
    icon?: React.JSX.Element
    path: string
    title: string
}

export const routes: Array<RouteElement> = [
    {
        element: <Main/>,
        path: '/',
        title: "Main page"
    },
    {
        element: <Register/>,
        path: '/register',
        title: "Register"
    },
    {
        element: <Login/>,
        path: '/login',
        title: "Login"
    },
    {
        element: <Clicker/>,
        path: '/clicker',
        title: "Clicker"
    }
]